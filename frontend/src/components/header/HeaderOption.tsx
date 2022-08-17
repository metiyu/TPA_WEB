import React from "react";
import "./HeaderOption.css";
import Avatar from "@material-ui/core/Avatar";

export default function HeaderOption({ avatar, Icon, title, onClick }: { avatar: any, Icon: any, title: any, onClick: any }) {
    return (
        <div onClick={onClick} className="headerOption">
            {Icon && <Icon className="headerOption__icon" />}
            {avatar && (
                <Avatar className="headerOption__icon" src={"https://picsum.photos/200"}>
                    email
                </Avatar>
            )}
            <h3 className="headerOption__title">{title}</h3>
        </div>
    );
}