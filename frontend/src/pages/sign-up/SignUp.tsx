import React, { useEffect, useState } from "react";
import "./Signup.css";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { REGISTER_QUERY } from "../../mutation-queries";
import toast, { Toaster } from 'react-hot-toast';
import { GET_USER } from "../../query-queries";
import { UseCurrentUser } from "../../contexts/userCtx";

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()
    const { getUser } = UseCurrentUser()
    const [registerFunc, { loading, data, error }] = useMutation(REGISTER_QUERY)

    function handleSubmit() {
        if (name == "") {
            toast.error("Name is empty")
            return
        }
        if (email == "") {
            toast.error("Email is empty")
            return
        }
        if (!(/\S+@\S+\.\S+/.test(email))) {
            toast.error("Invalid email")
            return
        }
        if (password == "") {
            toast.error("Password is empty")
            return
        }
        if (password !== confPassword) {
            toast.error("Confirm password doesn't match")
            return
        }

        const input = {
            name: name,
            email: email,
            password: password
        }

        toast.promise(
            registerFunc({
                variables: {
                    input: input
                }
            }).then(() => {
                console.log("succes create user");
                navigate('/')
            }).catch((err) => {
                console.log(err);
                toast.error(err.message)
            }), {
            loading: "Processing",
            success: "Success create account",
            error: "Error"
        })
    }

    return (
        <div className="login">
            <Toaster position="top-right" />
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
