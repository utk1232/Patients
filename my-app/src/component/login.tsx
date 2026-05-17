import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Register from '../pages/register';

const Login = () => {
    const [emailId, setEmail] = useState("utk@gmail.com");
    const [password, setPassword] = useState("ukarsh");
    const [error, setError] = useState('');
   const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:7777/login", {
                emailId,
                password
            },{withCredentials: true});
            
            console.log('Login successful:', res.data);
            setError('');         
            navigate('/dashboard')
        }
        catch (error: any) {
            console.error('Login failed:', error);
            setError(error.response?.data?.message || 'Login failed');
        }
    }

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email   {emailId}</label>
            <input type="email" value={emailId} onChange={(e)=>{setEmail(e.target.value)}} className="input" placeholder="Email" />

            <label className="label">Password  {password}</label>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input" placeholder="Password" />

            {error && <div className="alert alert-error mt-4"><span>{error}</span></div>}

            <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                Login
            </button><br></br>
            <button className="btn btn-ghost mt-2" onClick={()=>navigate('/register')}>
                Don't have an account? Register
            </button>

        </fieldset>
    )
}

export default Login
