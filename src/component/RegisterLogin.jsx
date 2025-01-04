import React, { useState } from 'react';
import axios from 'axios';
import './RegisterLogin.css'
import { useNavigate } from "react-router-dom";


function RegisterLogin() {
    const [active, setActive] = useState(false);

  const navigate = useNavigate();


    // Register form state
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPhone, setRegisterPhone] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');

    // Register user function
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://smart-hire-backend.vercel.app/api/Smartuser", {
                name: registerName,
                email: registerEmail,
                password: registerPassword,
                phone: registerPhone
            });

            if (res.data.accessToken) {
                localStorage.setItem("accessToken", res.data.accessToken);
            } else {
                setLoginError("Invalid email or password");
            }
            setRegisterError(null);
            setRegisterSuccess(res.data.message);
            setRegisterEmail('');
            setRegisterPassword('');
            setRegisterName('');
            setRegisterPhone('');
            navigate("/smartHire")

        } catch (error) {
            setRegisterError(error.response?.data?.message || "An error occurred.");
            setRegisterSuccess('');
        }
    };

    // Login form state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Login user function
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://smart-hire-backend.vercel.app/api/SmartuserLogin", {
                email: loginEmail,
                password: loginPassword
            });

            if (res.data.accessToken) {
                localStorage.setItem("accessToken", res.data.accessToken);
            } else {
                setLoginError("Invalid email or password");
            }
    

            setLoginEmail("");
            setLoginPassword("");
            setLoginError(null);
            navigate("/smartHire")

        } catch (error) {
            setLoginError(error.response?.data?.message || "An error occurred.");
        }
    }

    // Function to toggle login modal
    const loginBtn = () => {
        setActive(!active);  
    }
    const closeLogin = () => {
        setActive(false);  
    }

    return (
        <div>
            {/* Register Form */}
            <div className="Register-form">
                <form className="register" onSubmit={registerUser}>
                    {registerError && <h3 style={{ color: 'red' }}>{registerError}</h3>}
                    {registerSuccess && <h3 style={{ color: 'green' }}>{registerSuccess}</h3>}
                    <h2>Register</h2>
                    <div className="label-input">
                        <label>Name</label>
                        <input type="text" placeholder="Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} id='input-reg' className='input' />
                    </div>
                    <div className="label-input">
                        <label>Email</label>
                        <input type="email" placeholder="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} id='input-email'  className='input'/>
                    </div>
                    <div className="label-input">
                        <label>Password</label>
                        <input type="password" placeholder="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} id='input-pass' className='input' />
                    </div>
                    <div className="label-input">
                        <label>Phone</label>
                        <input type="text" placeholder="Phone" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} id='input-phone' className='input' />
                    </div>
                    <button type="submit" id='submit'>Submit</button>
                </form>
            </div>

            {/* Login Button to toggle the form visibility */}
            <button className='login-btn' onClick={loginBtn}>Login</button>

            {/* Conditionally Render Login Form */}
            {active && (
                <div className={`loginModel ${active ? 'active' : ''}`}>
                    <div className="closeLogin" onClick={closeLogin}>Close</div>
                    <div className="login-form">
                        <form id="loginForm" onSubmit={loginUser}>
                            {loginError && <h3 style={{ color: 'red' }}>{loginError}</h3>}
                            <div className="label-login">
                                <label>Email</label>
                                <input type="email" placeholder="email" id='input-email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className='loginInput' />
                            </div>
                            <div className="label-login">
                                <label>Password</label>
                                <input type="password" placeholder="password-pass" id='input' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className='loginInput' />
                            </div>
                            <button type='submit' id='loginSubmit'>Login</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegisterLogin;
