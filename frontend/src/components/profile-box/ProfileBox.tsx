import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { UseCurrentUser } from "../../contexts/userCtx";
import EditProfile from "../popup/edit-profile/EditProfile";
import './ProfileBox.css'

export default function ProfileBox() {
    const { getUser } = UseCurrentUser()
    const currUser = getUser()
    const [dropdownClassname, setDropdownClassname] = useState("edit__profile_invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")

    function handleShowEditProfile(){
        if(dropdownClassname == "edit__profile_invisible"){
            setDropdownClassname("edit__profile_show")
            setGreyBackground("overlay_show")
        }
        else{
            setDropdownClassname("edit__profile_invisible")
            setGreyBackground("overlay_invisible")
        }
    }

    return (
        <div className="default__profile">
            <div className="cover__photo">
                <img src={currUser.photo_background} alt="" />
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
    )
}