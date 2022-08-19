import React from "react";
import "./Sidebar.css";
import Avatar from "@material-ui/core/Avatar";
import { UseCurrentUser } from "../../contexts/userCtx";

export default function Sidebar() {
    const {getUser} = UseCurrentUser()
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
                <img
                    src="https://images.unsplash.com/photo-1523650055327-53aeba964f5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                    alt=""
                />
                <Avatar src={"https://picsum.photos/200"} className="sidebar__avatar">
                    {currUser.email}
                </Avatar>
                <h2>{currUser.name}</h2>
                {currUser.work ? (
                    <h4>{currUser.work}</h4>
                ) : ("")}
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