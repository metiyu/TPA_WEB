import React, { useEffect, useState } from "react";
import "./SignIn.css";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../mutation-queries";
import { UseCurrentUser } from "../../contexts/userCtx";
import toast, { Toaster } from 'react-hot-toast';
import { GET_USER } from "../../query-queries";

export default function SignIn() {
    const [email, setEmail] = useState(() => "");
    const [password, setPassword] = useState(() => "");
    const [name, setName] = useState(() => "");
    const [profilePic, setProfilePic] = useState(() => "");
    const navigate = useNavigate();
    const [loginFunc, { data, loading, error }] = useMutation(LOGIN_QUERY)
    const { getUser, setUserToStorage } = UseCurrentUser()

    {
        const { data, loading, error } = useQuery(GET_USER, {
            variables: {
                id: getUser().id
            }
        })
        if (!loading) {
            if(data == undefined){
                window.localStorage.removeItem("user")
            }
        }
    }

    function handleSubmit() {
        if (email == "") {
            toast.error("Email is empty")
            return
        }
        if (password == "") {
            toast.error("Password is empty")
            return
        }
        if (email.indexOf("'") != -1 || password.indexOf("'") != -1) {
            toast.error("SQL Injection detected")
            return
        }

        loginFunc({
            variables: {
                email: email,
                password: password
            }
        }).then((e) => {
            console.log("success login");
            if (data && data.login.token !== undefined) {
                const user = data.login
                console.log(user);
                setUserToStorage(user)
                navigate('/feed')
            }
        }).catch((err) => {
            console.log(err);
            if (err.message == "crypto/bcrypt: hashedPassword is not the hash of the given password")
                toast.error("Wrong password")
            else if (err.message == "your account is not authenticated")
                toast.error("Your account is not activated")
            else
                toast.error(err.message)
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
                <h2>Sign in</h2>
                <p>Stay updated on your professional world</p>
            </div>
            <form>
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
                <span className="href" onClick={() => navigate('/forgot-password')}>Forgot password?</span>
                <button type="button" onClick={() => handleSubmit()}>
                    Sign In
                </button>
                <hr className="hr-text" data-content="OR" />
            </form>
            <button className="another_button" /*onclick*/>
                <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="" />
                Sign in with Google
            </button>

            <p>
                New to LinkedIn? {` `}
                <span className="href" onClick={() => navigate('/sign-up')}>
                    Register Now
                </span>
            </p>
        </div>
    );
}
