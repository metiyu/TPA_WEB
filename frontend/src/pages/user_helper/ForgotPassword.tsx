import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FORGET_CODE_QUERY } from '../../mutation-queries'
import './ForgotPassword.css'
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const [funcForget] = useMutation(FORGET_CODE_QUERY)

    function handleSubmit() {
        if (email == "") {
            toast.error("Email is empty")
            return
        }
        toast.promise(
            funcForget({
                variables: {
                    email: email
                }
            }).then((e) => {
                console.log("success sent");
                console.log(e.data.createCode.id);
                navigate('/code-verification/' + e.data.createCode.id)
            }).catch((err) => {
                console.log(err);
                if (err.message == "record not found")
                    toast.error("Email is not register")
                else
                    toast.error(err.message)
            }), {
            loading: "Processing",
            success: "Success sent code to your email",
            error: "Error"
        })
    }

    return (
        <div className='user_helper'>
            <Toaster position='top-right' />
            <div className="title">
                <h2>Forgot password?</h2>
                <p>Reset password in two quick steps</p>
            </div>
            <form>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                />
                <button type="button" onClick={() => handleSubmit()}>
                    Reset password
                </button>
            </form>
            <span className='href' onClick={() => navigate(-1)}>Back</span>
        </div>
    )
}