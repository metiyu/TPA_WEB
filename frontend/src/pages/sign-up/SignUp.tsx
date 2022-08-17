import React, { useState } from "react";
import "./Signup.css";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState()
    const [errorMsg, setErrorMsg] = useState("")
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate()

    function handleSubmit() {
        if (PasswordValidation()) {
            navigate('/')
        }
    }

    function PasswordValidation() {
        if (password !== confPassword) {
            setErrorMsg("Confirm password doesn't match")
            setShowError(true)
            return false
        }
        return true
    }

    return (
        <div className="login">
            <img
                src={logo}
                alt=""
            />
            <div className="title">
                <h2>Sign Up</h2>
                <p>Make the most of your professional life</p>
            </div>
            <form>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    type="text"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                <input
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="Confirm Password"
                    type="password"
                />
                <div className="error">
                    <p>{errorMsg}</p>
                </div>
                <button type="button" onClick={() => handleSubmit()}>
                    Sign Up
                </button>
            </form>

            <p>
                Already on LinkedIn?{` `}
                <span className="login__register" onClick={() => navigate('/')}>
                    Sign in
                </span>
            </p>
        </div>
    );
}
