import { Link, useNavigate } from 'react-router';
import "../auth.from.scss";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from 'react';

export default function Login() {

    const { loading, handleLogin } = useAuth();

    const [loginData, setLoginData] = useState({
        email : "",
        password : ""  
    })

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
        setLoginData({
            email : "",
            password : ""
        })
    }

    const navigate = useNavigate();

    return (
        <main>
            <div className="from-container">
                <h2>Login Your Account</h2>

                <form onSubmit={handleSubmit}> 
                    <div className="input-grp">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder="Enter your Correct Email..."
                            value={loginData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-grp">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your Correct Password..." 
                            value={loginData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button className='btn primary-btn' type="submit">Login</button>
                </form>

                <p>
                    Don't have an account? <Link to={"/register"}>Register</Link>
                </p>
            </div>
        </main>
       
    )
}