import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import './ProfileCard.css'

export default function ProfileCard(/*{name, work}: {name: string, work: string}*/) {
    return (
        <div className="container__card">
            <Avatar className="avatar" src={"https://picsum.photos/200"} />
            <div className="card__description">
                <p className="name">{/*{name}*/}Name</p>
                <p className="work">{/*{work}*/}Computer Science Undergraduate</p>
                <button>Ignore</button>
                <button>Accept</button>
            </div>
        </div>
    )
}