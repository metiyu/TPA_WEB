import './Invitations.css'
import ProfileCard from './ProfileCard'

export default function Invitations() {
    return (
        <div className="container__invitations">
            <div className='container__header'>
                <p>Invitations</p>
                <button>Manage</button>
            </div>
            <div className='container__cards'>
                <hr />
                <ProfileCard />
                <hr />
                <ProfileCard />
                <hr />
                <ProfileCard />
            </div>
        </div>
    )
}