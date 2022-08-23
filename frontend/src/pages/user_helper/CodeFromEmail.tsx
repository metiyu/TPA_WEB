import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FORGET_CODE_QUERY } from '../../mutation-queries'
import './ForgotPassword.css'
import toast, { Toaster } from 'react-hot-toast';
import { GET_FORGET_CODE_QUERY } from '../../query-queries'

export default function CodeFromEmail() {
    const [code, setCode] = useState("")
    const [codeFromDB, setCodeFromDB] = useState("")
    const [isSix, setIsSix] = useState("button_disable")
    const [disabled, setDisabled] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, loading, error } = useQuery(GET_FORGET_CODE_QUERY, {
        variables: {
            id: id
        }
    })

    useEffect(() => {
        if (!loading) {
            setCodeFromDB(data.getCode.code);
        }
    }, [data])

    function handleCode(e: any) {
        const res = e.target.value.replace(/\D/g, '')
        setCode(res)
    }

    function handleSubmit() {
        if (code !== codeFromDB) {
            toast.error("Wrong code")
            return
        }
        navigate('/reset-password/' + id)
    }

    useEffect(() => {
        if (code.length == 6) {
            setIsSix("button_active")
            setDisabled(false)
        }
        else {
            setIsSix("button_disable")
            setDisabled(true)
        }
    }, [code])

    return (
        <div className='user_helper'>
            <Toaster position='top-right'/>
            <div className="title">
                <h2>We sent a code to your email</h2>
                <p>Enter the 6-digit verification code sent to your email</p>
            </div>
            <form>
                <input
                    value={code}
                    pattern="[0-9]*"
                    onChange={(e) => handleCode(e)}
                    placeholder="6 digit code"
                    type="text"
                />
                <button className={isSix} type="button" onClick={() => handleSubmit()} disabled={disabled}>
                    Submit
                </button>
            </form>
        </div>
    )
}