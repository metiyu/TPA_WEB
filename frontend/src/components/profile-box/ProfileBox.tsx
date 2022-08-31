import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { UseCurrentUser } from "../../contexts/userCtx";
import { FOLLOW_USER_QUERY, SEND_CONNECT_QUERY, UNCONNECT_USER_QUERY, UNFOLLOW_USER_QUERY } from '../../mutation-queries';
import { GET_USER } from '../../query-queries';
import EditProfile from "../popup/edit-profile/EditProfile";
import './ProfileBox.css'

export default function ProfileBox() {
    const { getUser, setUserToStorage } = UseCurrentUser()
    const currUser = getUser()
    const [dropdownClassname, setDropdownClassname] = useState("edit__profile_invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")
    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            id: id
        }
    })

    function handleShowEditProfile() {
        if (dropdownClassname == "edit__profile_invisible") {
            setDropdownClassname("edit__profile_show")
            setGreyBackground("overlay_show")
        }
        else {
            setDropdownClassname("edit__profile_invisible")
            setGreyBackground("overlay_invisible")
        }
    }

    const [sendConnectFunc] = useMutation(SEND_CONNECT_QUERY)
    const [unconnectFunc] = useMutation(UNCONNECT_USER_QUERY)
    const [button, setButton] = useState("connect")

    useEffect(() => {
        if (!loading) {
            if (getUser().pending_request != null) {
                if (getUser().pending_request.length > 0) {
                    if (getUser().pending_request.includes(data.user.id)) {
                        setButton("pending")
                    }
                }
            }
            if (getUser().connected_user != null) {
                if (getUser().connected_user.length > 0) {
                    if (getUser().connected_user.includes(data.user.id)) {
                        setButton("unconnect")
                    }
                }
            }
            if (getUser().followed_user != null) {
                if (getUser().followed_user.length > 0) {
                    if (getUser().followed_user.includes(data.user.id)) {
                        setFollowBtn("unfollow")
                    }
                    else {
                        setFollowBtn("follow")
                    }
                }
            }
            console.log(getUser());
        }
    }, [data])

    function handleConnect() {
        sendConnectFunc({
            variables: {
                id: getUser().id,
                requestedId: data.user.id
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.sendConnectRequest.userNow);
            setUserToStorage(e.data.sendConnectRequest.userNow)
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUnconnect() {
        unconnectFunc({
            variables: {
                id: getUser().id,
                unconnectedId: data.user.id
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.unconnectUser);
            setUserToStorage(e.data.unconnectUser)
        })
    }

    const [followFunc] = useMutation(FOLLOW_USER_QUERY)
    const [unfollowFunc] = useMutation(UNFOLLOW_USER_QUERY)
    const [followBtn, setFollowBtn] = useState("follow")

    function handleFollow() {
        followFunc({
            variables: {
                id: getUser().id,
                followedId: data.user.id
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.followUser);
            setUserToStorage(e.data.followUser)
        })
    }

    function handleUnfollow() {
        unfollowFunc({
            variables: {
                id: getUser().id,
                unfollowedId: data.user.id
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.unfollowUser);
            setUserToStorage(e.data.unfollowUser)
        })
    }

    const navigate = useNavigate()
    const [room, setRoom] = useState([{}])
    function handleMakeChatRoom() {
        const q = query(collection(db, "rooms"))
        onSnapshot(q, (docs) => {
            let array = [{}]
            docs.forEach(doc => {
                if (doc.data().users_id.includes(id) && doc.data().users_id.includes(getUser().id))
                    array.push({ ...doc.data(), id: doc.id })
            })
            handleNavigate(array)
        })
    }

    function handleNavigate(array: any) {
        if (array[1] != undefined) {
            navigate('/message/' + id)
        }
        else {
            addDoc(collection(db, "rooms"), {
                users_id: [getUser().id, id]
            }).then((e) => {
                navigate('/message/' + id)
                console.log(e);
            })
        }
    }

    return (
        <>
            {!data ? (
                <div className="default__profile">
                    <div className="cover__photo">
                        {currUser.photo_background ? (
                            <img src={currUser.photo_background} alt="" />
                        ) : (
                            <img src="https://i.picsum.photos/id/599/800/200.jpg?hmac=OHWF33Uii02mcUZCEh6O8PgadRmKGNNfM_34vHv952c" alt="" />
                        )}
                    </div>
                    <Avatar className="profile__photo" src={currUser.photo_profile} />
                    <h3>{currUser.name}</h3>
                    {currUser.work ? (
                        <h4>{currUser.work}</h4>
                    ) : ("")}
                    {currUser.education ? (
                        <h4>{currUser.education}</h4>
                    ) : ("")}
                    <div className="sub__information">
                        {currUser.region ? (
                            <p>{currUser.region}</p>
                        ) : ("")}
                    </div>
                    {currUser.connected_user ? (
                        <p className="connection">{currUser.connected_user.length} Connection</p>
                    ) : ("")}
                    <div className="buttons">
                        <button onClick={() => handleShowEditProfile()}>Edit profile</button>
                        <button>Save as pdf</button>
                    </div>
                    <div className={dropdownClassname}>
                        <EditProfile />
                    </div>
                    <div id={greyBackground} onClick={() => handleShowEditProfile()}></div>
                </div>
            ) : (
                <div className="default__profile">
                    <div className="cover__photo">
                        {currUser.photo_background ? (
                            <img src={currUser.photo_background} alt="" />
                        ) : (
                            <img src="https://i.picsum.photos/id/599/800/200.jpg?hmac=OHWF33Uii02mcUZCEh6O8PgadRmKGNNfM_34vHv952c" alt="" />
                        )}
                    </div>
                    <Avatar className="profile__photo" src={data.user.photo_profile} />
                    <h3>{data.user.name}</h3>
                    {data.user.work ? (
                        <h4>{data.user.work}</h4>
                    ) : ("")}
                    {data.user.education ? (
                        <h4>{data.user.education}</h4>
                    ) : ("")}
                    <div className="sub__information">
                        {data.user.region ? (
                            <p>{data.user.region}</p>
                        ) : ("")}
                    </div>
                    {data.user.connected_user ? (
                        <p className="connection">{data.user.connected_user.length} Connection</p>
                    ) : ("")}
                    <div className="buttons">
                        {followBtn == "follow" ? (
                            <button onClick={() => handleFollow()}>Follow</button>
                        ) : (
                            <button onClick={() => handleUnfollow()}>Unfollow</button>
                        )}
                        {button == "connect" ? (
                            <button onClick={() => handleConnect()}>Connect</button>
                        ) : (
                            button == "unconnect" ? (
                                <button onClick={() => handleUnconnect()}>Unconnect</button>
                            ) : (
                                <button>Pending</button>
                            )
                        )}
                        <button onClick={() => handleMakeChatRoom()}>Message</button>
                        <button>Share profile</button>
                        <button>Block</button>
                        <button>Save as pdf</button>
                    </div>
                    <div className={dropdownClassname}>
                        <EditProfile />
                    </div>
                    <div id={greyBackground} onClick={() => handleShowEditProfile()}></div>
                </div>
            )}
        </>
    )
}