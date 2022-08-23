import { useMutation } from "@apollo/client";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { UseCurrentUser } from "../../contexts/userCtx";
import { SEND_CONNECT_QUERY, UNCONNECT_USER_QUERY } from "../../mutation-queries";
import './PeopleCard.css'

export default function PeopleCard({ props }: { props: any }) {
    const [sendConnectFunc] = useMutation(SEND_CONNECT_QUERY)
    const [unconnectFunc] = useMutation(UNCONNECT_USER_QUERY)
    const { getUser, setUserToStorage } = UseCurrentUser()
    const [button, setButton] = useState("connect")

    console.log(getUser());

    useEffect(() => {
        if (getUser().pending_request != null) {
            if (getUser().pending_request.includes(props.ID)) {
                setButton("pending")
            }
        }
        if (getUser().connected_user != null) {
            if (getUser().connected_user.includes(props.ID)) {
                setButton("unconnect")
            }
        }

    }, [])

    function handleConnect(e: any) {
        sendConnectFunc({
            variables: {
                id: getUser().id,
                requestedId: e.ID
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.sendConnectRequest.userNow);
            setUserToStorage(e.data.sendConnectRequest.userNow)
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUnconnect(e: any) {
        unconnectFunc({
            variables: {
                id: getUser().id,
                unconnectedId: e.ID
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.unconnectUser);
            setUserToStorage(e.data.unconnectUser)
        })
    }

    return (
        <div className="search_people__container">
            <Avatar className='avatar' src='' />
            <div className='people_data'>
                <h4>{props.Name}</h4>
                <p>{props.Work}</p>
                <p>{props.Region}</p>
            </div>
            <div className='connect_button'>
                {button == "connect" ? (
                    <button onClick={() => handleConnect(props)}>Connect</button>
                ) : (
                    button == "unconnect" ? (
                        <button onClick={() => handleUnconnect(props)}>Unconnect</button>
                    ) : (
                        <button>Pending</button>
                    )
                )}
            </div>
        </div>
    )
}