import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { UseCurrentUser } from '../../contexts/userCtx'
import './NotificationBox.css'
import NotificationCard from './NotificationCard'

export default function NotificationBox() {
    const { getUser } = UseCurrentUser()
    const [notifs, setNotifs] = useState([])

    useEffect(() => {
        const q = query(collection(db, "user", getUser().id, "notification"), orderBy("createdAt", "desc"))
        onSnapshot(q, (docs) => {
            let array: any = []
            docs.forEach(doc => {
                array.push({ ...doc.data(), id: doc.id })
            })
            setNotifs(array)
        })
    }, [])

    return (
        <div className="notification__container">
            {notifs.map((notif: any) => 
                <div className='notification__list'>
                    <NotificationCard props={notif} key={notif.id} />
                </div>
            )}
        </div>
    )
}