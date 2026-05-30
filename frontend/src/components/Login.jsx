import {toast, ToastContainer} from 'react-toastify'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import {INPUTWRAPPER, LOGIN_FIELDS, BUTTON_CLASSES } from '../assets/dummy'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const INITIAL_FORM = {email:"",password:""}    
const URL="http://localhost:3000"


function Login({onSubmit,onSwitchMode}){
    
    const [showPassword,setShowPassword]=useState(false)
    const [loading,setLoading]=useState(false)
    const [formData,setFormData]=useState(INITIAL_FORM)
    const [remeberMe,setRememberMe]=useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post(
                `${URL}/v1/auth/login`,
                formData
            );
    
            console.log("LOGIN RESPONSE:", response.data);
    
            const data = response.data;
    
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("userId", data.data.user._id);
    
            // Update currentUser in App.jsx
            onSubmit?.({
                name: data.data.user.name,
                email: data.data.user.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    data.data.user.name
                )}&background=random`,
            });
    
        } catch (err) {
            console.error("LOGIN ERROR:", err);
            toast.error(
                err.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        const token=localStorage.getItem("token")
        const userId=localStorage.getItem("userId")
        if(token){
            (async ()=>{
                try{
                    const {data} = await axios.get(`${URL}/v1/auth/me`,{
                        headers:{Authorization:`Bearer ${token}`}
                    })
                    if(data.success){
                        onSubmit?.({token,userId,...data.user})
                        toast.success("Session restore. Redirecting")
                        navigate('/')
                    }else{
                        localStorage.clear()
                    }
                }catch(e){
                    localStorage.clear()
                }
            })()
        }
    },[navigate,onSubmit])

    const handleSWitchMode=()=>{
        toast.dismiss()
        onSwitchMode?.()
    }


    return (
        <div className="max-w-md bg-white w-full shadow-lg border border-purple-100 rounded-xl p-8">
            <ToastContainer position='top-center' autoClose={3000} hideProgressBar/>

            <div className='mb-6 text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-1'>
                    <LogIn className='w-8 h-8 text-white'/>
                </div>

            <h2 className='text-2xl font-bold text-gray-800'>Welcome back</h2>
            <p className='text-gray-500 text-sm mt-1'>sign in to continue to TaskFlow</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
            {LOGIN_FIELDS.map(({ name, type, placeholder, icon: Icon , isPassword }) => (
                    <div key={name} className={INPUTWRAPPER}>
                        <Icon className="text-purple-500 w-5 h-5 mr-2"/>
                        <input type={type} placeholder={placeholder} value={formData[name]} onChange={(e)=>setFormData({...formData,[name]:e.target.value })} 
                        className="w-full focus:outline-none text-sm text-gray-700" required
                        />

                        {isPassword && (
                            <button type='button' onClick={()=>setShowPassword((prev)=> !prev)} className='ml-2 text-gray-500 hover:text-purple-500 transition-colors'>
                                {showPassword ? <EyeOff className='w-5 h-5'/> : <Eye className='w-5 h-5'/>}

                            </button>
                        )}
                    </div>
                ))}

                <div className='flex items-center'>
                        <input type='checkbox' id='rememberMe' checked={remeberMe} onChange={()=>setRememberMe(!remeberMe)} className='h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded' required/>

                        <label htmlFor='remeberMe'className='ml-2 block text-sm text-gray-700 '>Remember Me </label>
                </div>

                <button type='submit' className={BUTTON_CLASSES} disabled={loading}>
                    {loading ? (
                        "Logging in..."
                    ):(
                        <>
                            <LogIn className='w-4 h-4'/>
                            LogIn
                        </>
                    )}
                    </button>
            </form>

            <p className='text-center text-sm text-gray-600 mt-6'>
                Don't have an Account?{' '}
                <button type='button' className='text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors' onClick={handleSWitchMode}>
                    Sign Up
                </button>
            </p>
        </div>
    )
}

export default Login;