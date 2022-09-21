import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FORGET_CODE_QUERY, RESET_PASSWORD_QUERY } from '../../mutation-queries'
import './ForgotPassword.css'
import toast, { Toaster } from 'react-hot-toast';
import { GET_FORGET_CODE_QUERY } from '../../query-queries'
import Footer from '../../components/footer/Footer'

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [userId, setUserId] = useState("")
    const { id } = useParams()
    const [funcResetPass] = useMutation(RESET_PASSWORD_QUERY)
    const navigate = useNavigate()
    const { data, loading, error } = useQuery(GET_FORGET_CODE_QUERY, {
        variables: {
            id: id
        }
    })

    useEffect(() => {
        if (!loading) {
            setUserId(data.getCode.userId);
        }
    }, [data])

    function handleSubmit() {
        if (password == "") {
            toast.error("Password is empty")
            return
        }
        if (password !== confPassword) {
            toast.error("Confirm password doesn't match")
            return
        }
        funcResetPass({
            variables: {
                id: userId,
                newPass: password
            }
        }).then(() => {
            console.log("success");
            navigate('/')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='user_helper_outer'>
            <div className='user_helper'>
                <Toaster position='top-right' />
                <div className="title">
                    <h2>Choose a new password.</h2>
                    <p>Create a new password</p>
                </div>
                <form>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New password"
                        type="password"
                    />
                    <input
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder="Retype new password"
                        type="password"
                    />
                    <button type="button" onClick={() => handleSubmit()}>
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}