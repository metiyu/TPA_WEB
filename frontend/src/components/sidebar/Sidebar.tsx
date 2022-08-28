import React from "react";
import "./Sidebar.css";
import Avatar from '@mui/material/Avatar';
import { UseCurrentUser } from "../../contexts/userCtx";

export default function Sidebar() {
    const { getUser } = UseCurrentUser()
    const currUser = getUser()

    const recentItem = (topic: string) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                {currUser.photo_background ? (
                    <img src={currUser.photo_background} alt="" />
                ) : (
                    <img src="https://i.picsum.photos/id/599/800/200.jpg?hmac=OHWF33Uii02mcUZCEh6O8PgadRmKGNNfM_34vHv952c" alt="" />
                )}
                <Avatar src={currUser.photo_profile} className="sidebar__avatar" sx={{ width: 70, height: 70 }}>
                    {currUser.email}
                </Avatar>
                <h2>{currUser.name}</h2>
                {currUser.work ? (
                    <h4>{currUser.work}</h4>
                ) : (
                    <h4>{currUser.education}</h4>
                )}
            </div>

            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className="sidebar__statNumber">2,543</p>
                </div>
                <div className="sidebar__stat">
                    <p>View on post</p>
                    <p className="sidebar__statNumber">2,448</p>
                </div>
            </div>

            {/* <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem("reactjs")}
                {recentItem("programming")}
                {recentItem("softwareengineering")}
                {recentItem("design")}
                {recentItem("developer")}
            </div> */}
        </div>
    );
}