import { Avatar } from '@mui/material'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import './MessageBox.css'
import ImageIcon from '@mui/icons-material/Image';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { UseCurrentUser } from '../../contexts/userCtx'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GENERATE_ID, GET_USER, SEARCH_CONNECTED_USER_QUERY } from '../../query-queries'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import PeopleBubble from './PeopleBubble'

export default function MessageBox() {
    const [roomID, setRoomID] = useState("")
    const [chats, setChats] = useState([{}])
    const [btnClassname, setBtnClassname] = useState('send_button__false')
    const storage = getStorage()
    const { getUser } = UseCurrentUser()
    const [generatedId, setGeneratedId] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [message, setMessage] = useState("")
    const { id } = useParams()
    const [rooms, setRooms] = useState([{}])
    const { data, loading } = useQuery(GET_USER, {
        variables: {
            id: id
        }
    })

    useEffect(() => {
        const q = query(collection(db, "rooms"))
        onSnapshot(q, (docs) => {
            let array = [{}]
            docs.forEach(doc => {
                if (doc.data().users_id.includes(getUser().id))
                    array.push({ ...doc.data(), id: doc.id })
                if (doc.data().users_id.includes(getUser().id) && doc.data().users_id.includes(id))
                    setRoomID(doc.id)
            })
            setRooms(array)
        })
    }, [id])


    useEffect(() => {
        if (roomID != "") {
            const q = query(collection(db, "rooms", roomID, "chats"), orderBy("createdAt", "asc"))
            onSnapshot(q, (docs) => {
                let array = [{}]
                docs.forEach(doc => {
                    array.push({ ...doc.data(), id: doc.id })
                })
                setChats(array)
            })
        }
    }, [roomID])

    console.log(chats);


    function sendChat(senderID: any) {
        addDoc(collection(db, "rooms", roomID, "chats"), {
            message: message,
            createdAt: new Date(),
            sender: senderID
        }).then((e) => {
            setMessage("")
        })
    }

    async function handleSetContent(e: any) {
        setBtnClassname("send_button__false")
        const files = e.target.files[0]
        let photoRef = ref(storage, `lost/${getUser().id}`)
        if (generatedId != "") {
            photoRef = ref(storage, `chats/${roomID}/${generatedId}`)
            await uploadBytes(photoRef, files)
            toast.promise(
                getDownloadURL(photoRef).then((e) => {
                    setPhotoURL(e)
                    setBtnClassname("send_button__true")
                }), {
                loading: "Uploading",
                success: "Uploaded",
                error: "Error"
            })
        }
    }

    function handleMessage(e: any) {
        setMessage(e)
        if (e == "" || id == undefined) {
            setBtnClassname("send_button__false")
        } else {
            setBtnClassname("send_button__true")
        }
    }

    const [searchUser, { data: searchData, loading: searchLoading }] = useLazyQuery(SEARCH_CONNECTED_USER_QUERY)

    const [keyword, setKeyword] = useState("")
    function handleSearchConnectedUser(e: any) {
        setKeyword(e)
        searchUser({
            variables: {
                keyword: e
            }
        })
    }

    function handleMakeChatRoom(e: any) {
        console.log(e);
        console.log(getUser());
        if (getUser().connected_user != null) {
            if (getUser().connected_user.includes(e.id)) {
                const q = query(collection(db, "rooms"))
                onSnapshot(q, (docs) => {
                    let array = [{}]
                    docs.forEach(doc => {
                        if (doc.data().users_id.includes(e.id) && doc.data().users_id.includes(getUser().id))
                            array.push({ ...doc.data(), id: doc.id })
                    })
                    handleNavigate(array)
                })
            }
            else {
                navigate('/profile/' + e.id)
            }
        }
        else {
            navigate('/profile/' + e.id)
        }
    }

    const navigate = useNavigate()
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
            {data ?
                <div className='container__messagebox'>
                    <div className='container__people'>
                        <p>Messaging</p>
                        <hr />
                        {rooms.map((room: any) =>
                            room.id != undefined ?
                                <PeopleBubble props={room} /> : ""
                        )}
                    </div>
                    <hr />
                    <div className='container__message'>
                        <p>{data.user.name}</p>
                        <hr />
                        <div className='chat__bubble__section'>
                            {chats.map((chat: any) =>
                                chat != {} ?
                                    chat.createdAt != undefined ?
                                        chat.sender != getUser().id ?
                                            // console.log(new Date(chat.createdAt.seconds * 1000 + chat.createdAt.nanoseconds / 1000000))
                                            <div className='left__bubble_chat'>
                                                <p>{new Date(chat.createdAt.seconds * 1000 + chat.createdAt.nanoseconds / 1000000).getHours().toString().padStart(2, "0")}:
                                                    {new Date(chat.createdAt.seconds * 1000 + chat.createdAt.nanoseconds / 1000000).getMinutes().toString().padStart(2, "0")}</p>
                                                <div>{chat.message}</div>
                                            </div>
                                            :
                                            <div className='right__bubble_chat'>
                                                <p>{new Date(chat.createdAt.seconds * 1000 + chat.createdAt.nanoseconds / 1000000).getHours().toString().padStart(2, "0")}:
                                                    {new Date(chat.createdAt.seconds * 1000 + chat.createdAt.nanoseconds / 1000000).getMinutes().toString().padStart(2, "0")}</p>
                                                <div>{chat.message}</div>
                                            </div>
                                        : ""
                                    : ""
                            )}
                        </div>
                        <hr />
                        <div className='chat__section'>
                            <input type="text" value={message}
                                onChange={(e) => handleMessage(e.target.value)} />
                            <div className='input__file'>
                                <label htmlFor="postPhoto">
                                    <div className='icon'>
                                        <ImageIcon />
                                    </div>
                                </label>
                                <input className='input_file' type="file" id="postPhoto" name="postPhoto" accept="image/png, image/gif, image/jpeg" onChange={(e) => handleSetContent(e)} />
                            </div>
                            {btnClassname == "post_button__false" ?
                                <button className={btnClassname} disabled>Send</button>
                                :
                                <button className={btnClassname} onClick={() => sendChat(getUser().id)}>Send</button>
                            }
                        </div>
                    </div>
                </div>
                :
                <div className='container__messagebox'>
                    <div className='container__people'>
                        <p>Messaging</p>
                        <hr />
                        {rooms.map((room: any) =>
                            room.id != undefined ?
                                <PeopleBubble props={room} /> : ""
                        )}
                    </div>
                    <hr />
                    <div className='container__message'>
                        <p>New Message</p>
                        <hr />
                        <input type="text" placeholder='Find Connected User...' onChange={(e) => handleSearchConnectedUser(e.target.value)} />
                        <hr />
                        <div className='search_connected_user__container'>
                            {searchData ?
                                searchData.searchConnectedUser.map((search: any) =>
                                    search.id != getUser().id ?
                                        <div onClick={() => handleMakeChatRoom(search)}>
                                            <p>{search.name}</p>
                                            <hr />
                                        </div>
                                        : ""
                                )
                                : ""}
                        </div>
                        <div className='chat__bubble__section'>
                        </div>
                        <hr />
                        <div className='chat__section'>
                            <input type="text" value={message}
                                onChange={(e) => handleMessage(e.target.value)} />
                            <div className='input__file'>
                                <label htmlFor="postPhoto">
                                    <div className='icon'>
                                        <ImageIcon />
                                    </div>
                                </label>
                                <input className='input_file' type="file" id="postPhoto" name="postPhoto" accept="image/png, image/gif, image/jpeg" onChange={(e) => handleSetContent(e)} />
                            </div>
                            {btnClassname == "post_button__false" ?
                                <button className={btnClassname} disabled>Send</button>
                                :
                                <button className={btnClassname} onClick={() => sendChat(getUser().id)}>Send</button>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}