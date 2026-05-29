import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";

function Layout({onLogout,user}){

    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const fetchTasks = useCallback(async ()=>{
        setLoading(true);
        setError(null);
        try{
            const token=localStorage.getItem("token");
            if(!token){
                throw new Error('No auth Token Found')
            }

            const {data}=await axios.get("http://localhost:3000/v1/task",{
                headers:{ Authorization: `Bearer ${token}` }
            })

            const arr=Array.isArray(data) ? data : Array.isArray(data?.task) ? data.task : Array.isArray(data?.data) ? data.data : []

            setTasks(arr)

        }catch (e){
            console.error(e)
            setError(e.message || 'could not load tasks')
            if(e.response?.status === 401) onLogout()
        }finally {
            setLoading(false);
        }
    },[onLogout])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks]);

    const stats = useMemo(()=>{
        const completedTask = tasks.filter(t => t.completed === true || t.completed === 1 ||(typeof t.completed === "string" && t.completed.toLowerCase() === "yes")).length

        const totalCount=tasks.length
        const pendingCount=totalCount-completedTask
        const completionpercentage=Math.round((completedTask/totalCount)*100)

        return {
            totalCount,
            pendingCount,
            completedTask,
            completionpercentage
        }
    },[tasks])

    const statCard=({title,value,icon})=>(

        <div className='p-3 md:p-4 rounded-xl bg-white shadow-sm border border-purple-100 hover:shadow-md transition-all duration-300 min-w-0'>
            <div className='flex items-center gap-2'>
                <div className='p-1.5 rounded-lg bg-gredient-to-br from-fuchsia-500/10 to-purple-500/10 group-hover:from-fuchsia-500/20 group-hover:to-purple-500/20'>
                    {icon}
                </div>
                <div className='min-w-0'>
                    <p className='text-lg sm:text-xl font-bold bg-gredient-to-br from-fuchsia-500 to-purple-500 bg-clip-text text-transparent'>
                        {value}
                    </p>
                    <p className='text-xs text-gray-500 font-medium'>{title}</p>
                </div>

            </div>
        </div>

    )

    // loading
    if(loading) return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
        </div>
    )


    return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar user={user} onLogout={onLogout}/>
        <Sidebar user={user} tasks={tasks}/>
        <div className='ml-0 xl:ml-64 lg:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300'>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="xl:col-span-2 space-y-3 sm:space-y-4">
                    <Outlet context={{tasks,refreshTasks:fetchTasks}}/>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Layout;