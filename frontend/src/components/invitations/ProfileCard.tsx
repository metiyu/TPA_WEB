import { useMutation, useQuery } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import { UseCurrentUser } from '../../contexts/userCtx';
import { ACCEPT_CONNECT_QUERY, IGNORE_CONNECT_QUERY } from '../../mutation-queries';
import { GET_USER } from '../../query-queries';
import './ProfileCard.css'

export default function ProfileCard({ props }: { props: any }) {
    const { getUser, setUserToStorage } = UseCurrentUser()
    const [acceptFunc] = useMutation(ACCEPT_CONNECT_QUERY)
    const [igonerFunc] = useMutation(IGNORE_CONNECT_QUERY)
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            id: props
        }
    })

    console.log(data);
    

    function handleAccept(e: any) {
        acceptFunc({
            variables: {
                id: getUser().id,
                acceptedId: e
            }
        }).then((e) => {
            console.log("success");
            setUserToStorage(e.data.acceptConnectRequest)
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleIgnore(e: any) {
        igonerFunc({
            variables: {
                id: getUser().id,
                ignoredId: e
            }
        }).then((e) => {
            console.log("success");
            setUserToStorage(e.data.ignoreConnectRequest)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            {!loading ? (
                <div className="container__card">
                    <Avatar className="avatar" src={data.user.photo_profile} />
                    <div className="card__description">
                        <p className="name">{data.user.name}</p>
                        <p className="work">{data.user.work}</p>
                        <button onClick={() => handleIgnore(props)}>Ignore</button>
                        <button onClick={() => handleAccept(props)}>Accept</button>
                    </div>
                </div>
            ) : ("")}
        </>
    )
}