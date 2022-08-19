import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { UseCurrentUser } from "../../contexts/userCtx";
import EditProfile from "../popup/edit-profile/EditProfile";
import './ProfileBox.css'

export default function ProfileBox() {
    const { getUser } = UseCurrentUser()
    const currUser = getUser()
    const [dropdownClassname, setDropdownClassname] = useState("edit__profile_invisible")

    function handleShowEditProfile(){
        if(dropdownClassname == "edit__profile_invisible"){
            setDropdownClassname("edit__profile_show")
        }
        else{
            setDropdownClassname("edit__profile_invisible")
        }
    }

    return (
        <div className="default__profile">
            <div className="cover__photo"></div>
            <Avatar className="profile__photo" src="https://picsum.photos/200" />
            <h3>{currUser.name}</h3>
            {currUser.work ? (
                <h4>{currUser.work}</h4>
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
        </div>
    )
}