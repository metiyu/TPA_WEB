import { Avatar } from '@mui/material'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import './MessageBox.css'
import ImageIcon from '@mui/icons-material/Image';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { UseCurrentUser } from '../../contexts/userCtx'
import { useQuery } from '@apollo/client'
import { GENERATE_ID, GET_USER } from '../../query-queries'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
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
        if (e == "") {
            setBtnClassname("send_button__false")
        } else {
            setBtnClassname("send_button__true")
        }
    }

    return (
        <>
            {data ?
                <div className='container__messagebox'>
                    <div className='container__people'>
                        <p>Messaging</p>
                        <hr />
                        <input type="text" placeholder='Find Connected User...' />
                        {rooms.map((room) =>
                            room.id != undefined ?
                                <PeopleBubble props={room} /> : ""
                        )}
                    </div>
                    <hr />
                    <div className='container__message'>
                        <p>{data.user.name}</p>
                        <hr />
                        <div className='chat__bubble__section'>
                            {chats.map((chat) =>
                                chat != {} ?
                                    chat.sender != getUser().id ?
                                        <p className='left__bubble_chat'>{chat.message}</p>
                                        :
                                        <p className='right__bubble_chat'>{chat.message}</p>
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
                : ""}
        </>
    )
}