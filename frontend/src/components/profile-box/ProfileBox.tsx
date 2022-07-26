import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { UseCurrentUser } from "../../contexts/userCtx";
import { FOLLOW_USER_QUERY, SEND_CONNECT_QUERY, UNCONNECT_USER_QUERY, UNFOLLOW_USER_QUERY, VIEW_PROFILE } from '../../mutation-queries';
import { GET_USER, SEARCH_CONNECTED_USER_QUERY } from '../../query-queries';
import EditProfile from "../popup/edit-profile/EditProfile";
import './ProfileBox.css'
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ProfileInPDF from './ProfileInPDF';

export default function ProfileBox({ refetch, refetchNonCurrUser }: { refetch: any, refetchNonCurrUser: any }) {
    const { getUser, setUserToStorage } = UseCurrentUser()
    const currUser = getUser()
    const [dropdownClassname, setDropdownClassname] = useState("edit__profile_invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")
    const { id } = useParams()
    const { data: dataNonCurrUser, loading: loadingNonCurrUser, error: errorNonCurrUser } = useQuery(GET_USER, {
        variables: {
            id: id
        }
    })
    const { data: dataCurrUser, loading: loadingCurrUser, error: errorCurrUser } = useQuery(GET_USER, {
        variables: {
            id: getUser().id
        }
    })

    console.log(dataCurrUser);
    console.log(dataNonCurrUser);

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
        if (dataCurrUser && dataNonCurrUser) {
            console.log(dataCurrUser);
            console.log(dataNonCurrUser);

            if (dataCurrUser.user.pending_request != null) {
                if (dataCurrUser.user.pending_request.length > 0) {
                    if (dataCurrUser.user.pending_request.includes(dataNonCurrUser.user.id)) {
                        setButton("pending")
                    }
                }
            }
            if (dataCurrUser.user.connected_user != null) {
                if (dataCurrUser.user.connected_user.length > 0) {
                    if (dataCurrUser.user.connected_user.includes(dataNonCurrUser.user.id)) {
                        setButton("unconnect")
                    }
                }
            }
            if (dataCurrUser.user.followed_user != null) {
                if (dataCurrUser.user.followed_user.length > 0) {
                    if (dataCurrUser.user.followed_user.includes(dataNonCurrUser.user.id)) {
                        setFollowBtn("unfollow")
                    }
                    else {
                        setFollowBtn("follow")
                    }
                }
            }
        }
    }, [dataNonCurrUser])

    const [viewUserProfile] = useMutation(VIEW_PROFILE)
    useEffect(() => {
        if (dataCurrUser && dataNonCurrUser) {
            viewUserProfile({
                variables: {
                    id: dataCurrUser.user.id,
                    userProfileId: dataNonCurrUser.user.id
                }
            }).then((e) => {
                console.log("success");
                console.log(e);
                refetch()
                refetchNonCurrUser()
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [dataCurrUser])

    useEffect(() => {
        refetch()
        refetchNonCurrUser()
    }, [])

    function handleConnect() {
        sendConnectFunc({
            variables: {
                id: dataCurrUser.user.id,
                requestedId: dataNonCurrUser.user.id,
                message: ""
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.sendConnectRequest.userNow);
            setUserToStorage(e.data.sendConnectRequest.userNow)
            addDoc(collection(db, "user", dataNonCurrUser.user.id, "notification"), {
                createdAt: new Date(),
                type: "connect",
                from_id: getUser().id
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUnconnect() {
        unconnectFunc({
            variables: {
                id: dataCurrUser.user.id,
                unconnectedId: dataNonCurrUser.user.id
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
                id: dataCurrUser.user.id,
                followedId: dataNonCurrUser.user.id
            }
        }).then((e) => {
            console.log("success");
            console.log(e.data.followUser);
            setUserToStorage(e.data.followUser)
            addDoc(collection(db, "user", dataNonCurrUser.user.id, "notification"), {
                createdAt: new Date(),
                type: "follow",
                from_id: getUser().id
            })
        })
    }

    function handleUnfollow() {
        unfollowFunc({
            variables: {
                id: dataCurrUser.user.id,
                unfollowedId: dataNonCurrUser.user.id
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
        if (dataCurrUser.user.connected_user != null) {
            if (dataCurrUser.user.connected_user.includes(id)) {
                const q = query(collection(db, "rooms"))
                onSnapshot(q, (docs) => {
                    let array = [{}]
                    docs.forEach(doc => {
                        if (doc.data().users_id.includes(id) && doc.data().users_id.includes(dataCurrUser.user.id))
                            array.push({ ...doc.data(), id: doc.id })
                    })
                    handleNavigate(array)
                })
            }
        }
        toast("User is not connected yet")
    }

    function handleNavigate(array: any) {
        if (array[1] != undefined) {
            navigate('/message/' + id)
        }
        else {
            addDoc(collection(db, "rooms"), {
                users_id: [dataCurrUser.user.id, id]
            }).then((e) => {
                navigate('/message/' + id)
                console.log(e);
            })
        }
    }

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [popupClassname, setPopupClassname] = useState("post__popup_share_hide")
    function handleShareProfile() {
        if (popupClassname == "post__popup_share_hide") {
            setPopupClassname("post__popup_share_show")
        } else {
            setPopupClassname("post__popup_share_hide")
        }
    }

    const [searchUser, { data: searchData, loading: searchLoading }] = useLazyQuery(SEARCH_CONNECTED_USER_QUERY)
    const [keyword, setKeyword] = useState("")
    function handleSearchConnectedUser(e: any) {
        setKeyword(e)
        searchUser({
            variables: {
                id: getUser().id,
                keyword: e
            }
        })
    }

    const [roomID, setRoomID] = useState("")
    function shareProfile(search: any) {
        const q = query(collection(db, "rooms"))
        onSnapshot(q, (docs) => {
            docs.forEach(doc => {
                if (doc.data().users_id.includes(getUser().id) && doc.data().users_id.includes(search.id))
                    setRoomID(doc.id)
            })
        })

        addDoc(collection(db, "rooms", roomID, "chats"), {
            createdAt: new Date(),
            sender: getUser().id,
            profile: id
        }).then((e) => {
            console.log(e);
        })
    }

    return (
        <>
            {dataCurrUser ?
                !dataNonCurrUser ? (
                    <div className="default__profile">
                        <div className='profile_in_pdf' ref={componentRef}>
                            <ProfileInPDF props={dataCurrUser.user} />
                        </div>
                        <Toaster position="top-right" />
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
                            <button onClick={handlePrint}>Save as pdf</button>
                        </div>
                        <div className={dropdownClassname}>
                            <EditProfile />
                        </div>
                        <div id={greyBackground} onClick={() => handleShowEditProfile()}></div>
                    </div>
                ) : (
                    <div className="default__profile">
                        <div className='profile_in_pdf' ref={componentRef}>
                            <ProfileInPDF props={dataNonCurrUser} />
                        </div>
                        <Toaster position="top-right" />
                        <div className="cover__photo">
                            {dataNonCurrUser.photo_background ? (
                                <img src={dataNonCurrUser.photo_background} alt="" />
                            ) : (
                                <img src="https://i.picsum.photos/id/599/800/200.jpg?hmac=OHWF33Uii02mcUZCEh6O8PgadRmKGNNfM_34vHv952c" alt="" />
                            )}
                        </div>
                        <Avatar className="profile__photo" src={dataNonCurrUser.user.photo_profile} />
                        <h3>{dataNonCurrUser.user.name}</h3>
                        {dataNonCurrUser.user.work ? (
                            <h4>{dataNonCurrUser.user.work}</h4>
                        ) : ("")}
                        {dataNonCurrUser.user.education ? (
                            <h4>{dataNonCurrUser.user.education}</h4>
                        ) : ("")}
                        <div className="sub__information">
                            {dataNonCurrUser.user.region ? (
                                <p>{dataNonCurrUser.user.region}</p>
                            ) : ("")}
                        </div>
                        {dataNonCurrUser.user.connected_user ? (
                            <p className="connection">{dataNonCurrUser.user.connected_user.length} Connection</p>
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
                            <button onClick={() => handleShareProfile()}>Share profile</button>
                            <button>Block</button>
                            <button onClick={handlePrint}>Save as pdf</button>
                        </div>
                        <div className={popupClassname}>
                            <input type="text" placeholder="Search user..." onChange={(e) => handleSearchConnectedUser(e.target.value)} />
                            <div className='search_connected_user__container'>
                                {searchData ?
                                    searchData.searchConnectedUser != undefined ?
                                        searchData.searchConnectedUser.map((search: any) =>
                                            search.id != getUser().id ?
                                                <div onClick={() => shareProfile(search)}>
                                                    <p>{search.name}</p>
                                                    <hr />
                                                </div>
                                                : ""
                                        )
                                        : "" : ""}
                            </div>
                        </div>
                        <div className={dropdownClassname}>
                            <EditProfile />
                        </div>
                        <div id={greyBackground} onClick={() => handleShowEditProfile()}></div>
                    </div>
                ) : ""}
        </>
    )
}