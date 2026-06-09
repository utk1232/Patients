import React, { useEffect } from 'react'
import Login from '../component/login'

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login - Qkonnect';
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <Login />
    </div>
  )
}

export default LoginPage