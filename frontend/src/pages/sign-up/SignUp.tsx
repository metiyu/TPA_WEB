import React, { useEffect, useState } from "react";
import './SignUp.css'
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { REGISTER_BY_GOOGLE_QUERY, REGISTER_QUERY } from "../../mutation-queries";
import toast, { Toaster } from 'react-hot-toast';
import { GET_USER, GET_USER_BY_EMAIL } from "../../query-queries";
import { UseCurrentUser } from "../../contexts/userCtx";
import Footer from "../../components/footer/Footer";
import { CredentialModel, CredentialResponse, GsiButtonConfiguration, PromptMomentNotification } from "../sign-in/GoogleModel";
import { ParseJwt } from "../sign-in/token";

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()
    const { getUser, setUserToStorage } = UseCurrentUser()
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

        // toast.promise(
        registerFunc({
            variables: {
                input: input
            }
        }).then(() => {
            console.log("succes create user");
            toast.success("Success create account")
            navigate('/')
        }).catch((err) => {
            console.log(err);
            if (err.message == "must not be null") {
                toast.error("Email already taken")
            }
            else {
                toast.error(err.message)
            }
        })
        //     loading: "Processing",
        //     success: "",
        //     error: "Error"
        // })
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
        <div className="register_outer">
            <div className="register">
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
                    <hr className="hr-text" data-content="OR" />
                </form>
                <div id="GoogleSignIn"></div>

                <p>
                    Already on LinkedIn?{` `}
                    <span className="login__register" onClick={() => navigate('/')}>
                        Sign in
                    </span>
                </p>
            </div>
            <Footer />
        </div>
    );
}
