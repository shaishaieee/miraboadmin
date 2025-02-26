import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])
    
    return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes