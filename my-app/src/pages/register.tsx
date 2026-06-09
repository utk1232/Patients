import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Register - Qkonnect';
    }, []);

    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:7777/signup", {
                firstName,
                lastName,
                emailId,
                password    
            }, {withCredentials: true});

            console.log('Registration successful:', res.data);
            setError('');
            navigate('/')  // Redirect to login after successful registration
        }
        catch (error: any) {
            console.error('Registration failed:', error);
            setError(error.response?.data?.message || 'Registration failed');
        }
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">FirstName</label>
                            <input type="text" value={firstName} onChange={(e) => (setFirstName(e.target.value))} className="input" placeholder="FirstName" />
                           
                            <label className="label">LastName</label>
                            <input type="text" value={lastName} onChange={(e) => (setLastName(e.target.value))} className="input" placeholder="LastName" />
                           
                            <label className="label">Email</label>
                            <input type="email" value={emailId} onChange={(e) => (setEmailId(e.target.value))} className="input" placeholder="Email" />
                            <label className="label">Password</label>{password}
                            <input type="password" value={password} onChange={(e) => (setPassword(e.target.value))} className="input" placeholder="Password" />

                            <button className="btn btn-neutral mt-4" onClick={handleRegister}>
                                Register
                            </button>
                             {error && <p className="text-error">{error}</p>}
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register