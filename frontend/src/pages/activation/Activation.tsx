import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import { ACTIVATE_ACC_QUERY, GET_LINK_QUERY } from '../../queries'
import './Activation.css'

export default function Activation() {
    const { getTheme } = UseCurrentTheme()
    const [funcActivate] = useMutation(ACTIVATE_ACC_QUERY)
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, loading, error } = useQuery(GET_LINK_QUERY, {
        variables: {
            id: id
        }
    })

    if (!loading) {
        console.log(data.getLink.userId);
    }

    function handleActivate() {
        funcActivate({
            variables: {
                id: data.getLink.userId
            }
        }).then(() => {
            navigate('/')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="activate_app" style={{ ...getTheme() as React.CSSProperties }}>
            {loading ? (
                <div>...</div>
            ) : (
                <button onClick={() => handleActivate()}>Activate</button>
            )}
            <a href=""></a>
        </div>
    )
}