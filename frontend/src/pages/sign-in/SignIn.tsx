import React, { useEffect, useState } from "react";
import "./SignIn.css";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { LOGIN_QUERY, REGISTER_BY_GOOGLE_QUERY } from "../../mutation-queries";
import { UseCurrentUser } from "../../contexts/userCtx";
import toast, { Toaster } from 'react-hot-toast';
import { GET_USER, GET_USER_BY_EMAIL } from "../../query-queries";
import { CredentialModel, CredentialResponse, GsiButtonConfiguration, PromptMomentNotification } from "./GoogleModel";
import { ParseJwt } from "./token";
import { UseCurrentTheme } from "../../contexts/themeCtx";
import Footer from "../../components/footer/Footer";

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
            if (data == undefined) {
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
            console.log(data);

            if (data && data.login.token !== undefined) {
                const user = data.login
                console.log(user);
                setUserToStorage(user)
                navigate('/feed')
            }
        }).catch((err) => {
            console.log(err);
            if (err.message == "crypto/bcrypt: hashedPassword is not the hash of the given password" || err.message == "crypto/bcrypt: hashedSecret too short to be a bcrypted password")
                toast.error("Wrong password")
            else if (err.message == "your account is not authenticated")
                toast.error("Your account is not activated")
            else
                toast.error(err.message)
        })
    }

    const clientId = "72905273300-ab8lk319eu9r329qhto3pal87463qk55.apps.googleusercontent.com"
    const googleId = window.google?.accounts.id
    useEffect(() => {
        googleId?.initialize({
            client_id: clientId,
            callback: handleCallBack
        })

        googleId?.renderButton
            (
                document.getElementById("GoogleSignIn") as HTMLElement,
                {
                    type: "standard",
                    theme: "outline",
                    size: "large",
                    text: "signup_with",
                    shape: "pill",
                    width: "350px",
                } as GsiButtonConfiguration,

            )

        googleId?.prompt((notification: PromptMomentNotification) => {
            notification.isDisplayed()
        })

    }, [])

    const [getUserByEmailFunc, { data: userData, loading: userLoading }] = useLazyQuery(GET_USER_BY_EMAIL)
    const [registerUserByGoogle] = useMutation(REGISTER_BY_GOOGLE_QUERY)
    const handleCallBack = (response: CredentialResponse) => {
        const credentialData = ParseJwt(response.credential as string) as CredentialModel
        getUserByEmailFunc({
            variables: {
                email: credentialData.email
            }
        }).then((e) => {
            if (e.error) {
                if (e.error?.message == "record not found") {
                    registerUserByGoogle({
                        variables: {
                            email: credentialData.email,
                            email_verified: credentialData.email_verified,
                            name: credentialData.name,
                            id: credentialData.sub,
                            picture: credentialData.picture
                        }
                    }).then((e) => {
                        getUserByEmailFunc({
                            variables: {
                                email: credentialData.email
                            }
                        }).then((e) => {
                            setUserToStorage(e.data.getUserByEmail);
                            navigate('/feed')
                        })
                    })
                }
            }
            else {
                setUserToStorage(e.data.getUserByEmail);
                navigate('/feed')
            }
        })
    }

    return (
        <div className="login_outer">
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
                <div id="GoogleSignIn"></div>

                <p>
                    New to LinkedIn? {` `}
                    <span className="href" onClick={() => navigate('/sign-up')}>
                        Register Now
                    </span>
                </p>
            </div>
            <Footer />
        </div>
    );
}
