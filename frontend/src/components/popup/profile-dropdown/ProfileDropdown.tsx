import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom"
import { UseCurrentUser } from '../../../contexts/userCtx';
import "./ProfileDropdown.css"

export default function ProfileDropdown() {
    const navigate = useNavigate()
    const { getUser } = UseCurrentUser()
    const currUser = getUser()

    function handleSignout() {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div className="profile__dropdown">
            <div className="profile__content">
                <Avatar className='avatar' src={currUser.photo_profile}>

                </Avatar>
                <div className="profile__text">
                    <h3>{currUser.name}</h3>
                    {currUser.work ? (
                        <p>{currUser.work}</p>
                    ) : (
                        ""
                    )}

                </div>
            </div>
            <div className='button__dropdown'>
                <button onClick={() => navigate('/profile')}>
                    View Profile
                </button>
                <button onClick={() => handleSignout()}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}