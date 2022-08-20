import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom"
import { UseCurrentUser } from "../../contexts/userCtx"
import "./ProfileDropdown.css"

export default function ProfileDropdown(){
    const navigate = useNavigate()
    const {getUser} = UseCurrentUser()
    const currUser = getUser()

    return(
        <div className="profile__dropdown">
            <div className="profile__content">
                <Avatar src={currUser.photo_profile}>

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
            <button onClick={() => navigate('/profile')}>
                View Profile
            </button>
            <div className="signout">
                <h4>Account</h4>
                <p>Sign Out</p>
                <p>Account Preference</p>
            </div>
        </div>
    )
}