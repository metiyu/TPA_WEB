import { useQuery } from '@apollo/client'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import { UseCurrentUser } from '../../contexts/userCtx'
import { GET_USER } from '../../query-queries'
import './Invitations.css'
import ProfileCard from './ProfileCard'

export default function Invitations() {
    const { getUser } = UseCurrentUser()
    console.log(getUser().request_connect);

    return (
        <div className="container__invitations">
            <div className='container__header'>
                <p>Invitations</p>
                <button>Manage</button>
            </div>
            <div className='container__cards'>
                {getUser().request_connect ?
                    getUser().request_connect.length != 0 ?
                        getUser().request_connect.map((user: any) =>
                            <>
                                <hr />
                                <ProfileCard props={user} />
                            </>
                        ) : ""
                    : ""
                }
            </div>
        </div>
    )
}