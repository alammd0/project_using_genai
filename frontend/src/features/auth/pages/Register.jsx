import { Link, useNavigate } from "react-router";
import "../auth.from.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";

export default function Register() {

    const { loading, handleRegister } = useAuth();

    const navigate = useNavigate();

    const [fromData, setFromData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFromData({
            ...fromData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Clicked me")
        const { username, email, password } = fromData;
        handleRegister({ username, email, password });
        setFromData({
            username: "",
            email: "",
            password: ""
        })
    }

    if(loading) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        )
    }

    return (
         <main>
            <div className="from-container">
                <h2>Create a New Account</h2>

                <form onSubmit={handleSubmit}> 
                    <div className="input-grp">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter your username..." 
                            value={FormData.username} onChange={handleChange}
                        />
                    </div>

                    <div className="input-grp">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder="Enter your Correct Email..." 
                            value={FormData.email} onChange={handleChange}
                        />
                    </div>

                    <div className="input-grp">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your Correct Password..."
                            value={FormData.password} onChange={handleChange}
                        />
                    </div>

                    <button className='btn primary-btn' type="submit">Register</button>
                </form>

                <p>
                    Already have an account? <Link to={"/login"}>Login</Link>
                </p>
            </div>
        </main>
    )
}