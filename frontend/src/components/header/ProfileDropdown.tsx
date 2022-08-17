import { Avatar } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import "./ProfileDropdown.css"

export default function ProfileDropdown(){
    const navigate = useNavigate()

    return(
        <div className="profile__dropdown">
            <div className="profile__content">
                <Avatar src="https://picsum.photos/200/300">

                </Avatar>
                <div className="profile__text">
                    <h3>Name</h3>
                    <p>Education</p>
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