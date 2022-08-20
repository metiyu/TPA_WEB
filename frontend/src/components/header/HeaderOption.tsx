import React from "react";
import "./HeaderOption.css";
import Avatar from '@mui/material/Avatar';
import { UseCurrentUser } from "../../contexts/userCtx";

export default function HeaderOption({ avatar, Icon, title, onClick }: { avatar: any, Icon: any, title: any, onClick: any }) {
    const {getUser} = UseCurrentUser()
    const currUser = getUser()
    
    return (
        <div onClick={onClick} className="headerOption">
            {Icon && <Icon className="headerOption__icon" />}
            {avatar && (
                <Avatar className="headerOption__icon" src={currUser.photo_profile}>
                    email
                </Avatar>
            )}
            <h3 className="headerOption__title">{title}</h3>
        </div>
    );
}