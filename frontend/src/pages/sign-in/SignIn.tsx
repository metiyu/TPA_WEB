import React, { useEffect, useState } from "react";
import "./SignIn.css";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_QUERY } from "../../queries";
import { UseCurrentUser } from "../../contexts/userCtx";

export default function SignIn() {
    const [email, setEmail] = useState(() => "");
    const [password, setPassword] = useState(() => "");
    const [name, setName] = useState(() => "");
    const [profilePic, setProfilePic] = useState(() => "");
    const navigate = useNavigate();
    const [loginFunc, { data, loading, error }] = useMutation(LOGIN_QUERY)
    const { getUser, setUserToStorage } = UseCurrentUser()

    console.log(getUser());
    console.log(data);
    console.log(error);

    // useEffect(() => {
    //     const user = getUser()
    //     console.log(user);
    //     if (user.token !== undefined){
    //         navigate('/')
    //     }
    // }, [])

    // useEffect(() => {
    //     if (data && data.login.token !== undefined){
    //         const user = data.logi
    //     }
    // }, [data])

    function handleSubmit() {
        loginFunc({
            variables: {
                email: email,
                password: password
            }
        }).then(() => {
            console.log("success login");
            navigate('/feed')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="login">
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
