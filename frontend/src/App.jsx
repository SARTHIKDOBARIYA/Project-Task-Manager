import {useEffect, useState} from 'react'
import {Routes, Route, useNavigate, Outlet, Navigate} from "react-router-dom";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const navigate = useNavigate()

  const [currentUser,setCurrentUser]=useState(()=>{
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null
  })

  console.log('=== currentUser ===>', currentUser);
  useEffect(() => {
    console.log('=== currentUser ===>', currentUser);
    if(currentUser){
      localStorage.setItem("currentUser",JSON.stringify(currentUser))
    }
    else {
      localStorage.removeItem("currentUser");
    }
  },[currentUser])

  const handleAuthSubmit = (data) => {
    console.log("AUTH DATA:", data);

    const user = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
    };

    setCurrentUser(user);
    navigate("/", { replace: true });
};

  const handlelogout = () =>{
    localStorage.removeItem("token")
    setCurrentUser(null)
    navigate('/login',{replace : true})
  }

  const ProtectedLayout = () => {
    return (
        <Layout user={currentUser} onLogout={handlelogout}>
            <Outlet />
        </Layout>
    );
};

  return (
      <Routes>
        <Route
            path="/login"
            element={
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Login
                    onSubmit={handleAuthSubmit}
                    onSwitchMode={() => navigate("/signup")}
                />
              </div>
            }
        />

        <Route
            path="/signup"
            element={
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Signup
                    onSubmit={handleAuthSubmit}
                    onSwitchMode={() => navigate("/login")}
                />
              </div>
            }
        />

          <Route
            element={
              currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />
            }>
          <Route path="/" element={<Dashboard />} />
          </Route>

        <Route path='*' element={<Navigate to={currentUser ? '/' : '/login'} replace/>}/>
      </Routes>
  );
}

export default App