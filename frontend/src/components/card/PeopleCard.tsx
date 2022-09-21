import { useMutation, useQuery } from "@apollo/client";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCurrentUser } from "../../contexts/userCtx";
import { SEND_CONNECT_QUERY, UNCONNECT_USER_QUERY } from "../../mutation-queries";
import { GET_USER } from "../../query-queries";
import './PeopleCard.css'
import SendConnectModal from "./SendConnectModal";

export default function PeopleCard({ props }: { props: any }) {
    const [sendConnectFunc] = useMutation(SEND_CONNECT_QUERY)
    const [unconnectFunc] = useMutation(UNCONNECT_USER_QUERY)
    const { getUser, setUserToStorage } = UseCurrentUser()
    const [button, setButton] = useState("connect")
    const navigate = useNavigate()

    console.log(getUser());
    console.log(props);

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            id: getUser().id
        }
    })

    useEffect(() => {
        if (data.user.pending_request != null) {
            if (data.user.pending_request.includes(props.id)) {
                setButton("pending")
            }
        }
        if (data.user.connected_user != null) {
            if (data.user.connected_user.includes(props.id)) {
                setButton("unconnect")
            }
        }
    }, [])

    function handleConnect(e: any) {
        sendConnectFunc({
            variables: {
                id: getUser().id,
                requestedId: e.id
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
                unconnectedId: e.id
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.unconnectUser);
            setUserToStorage(e.data.unconnectUser)
        })
    }

    const [dropdownClassname, setDropdownClassname] = useState("send_connect__invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")

    function handleShowSendConnect() {
        console.log("clicked");
        if (dropdownClassname == "send_connect__invisible") {
            setDropdownClassname("send_connect__show")
            setGreyBackground("overlay_show")
        }
        else {
            setDropdownClassname("send_connect__invisible")
            setGreyBackground("overlay_invisible")
        }
    }


    return (
        <>
            <div id={greyBackground} onClick={() => handleShowSendConnect()}></div>
            <div className={dropdownClassname}>
                <SendConnectModal />
            </div>
            <div className="search_people__container">
                <Avatar className='avatar' src={props.photo_profile} onClick={() => navigate(`/profile/${props.id}`)} />
                <div className='people_data' onClick={() => navigate(`/profile/${props.id}`)}>
                    <h4>{props.name}</h4>
                    <p>{props.work}</p>
                    <p>{props.region}</p>
                </div>
                <div className='connect_button'>
                    {button == "connect" ? (
                        <button onClick={() => handleShowSendConnect()}>Connect</button>
                    ) : (
                        button == "unconnect" ? (
                            <button onClick={() => handleUnconnect(props)}>Unconnect</button>
                        ) : (
                            <button>Pending</button>
                        )
                    )}
                </div>
            </div>
        </>
    )
}