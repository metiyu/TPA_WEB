import { useQuery } from '@apollo/client'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import { UseCurrentUser } from '../../contexts/userCtx'
import { GET_USER } from '../../query-queries'
import './Invitations.css'
import ProfileCard from './ProfileCard'

export default function Invitations() {
    const { getUser } = UseCurrentUser()
    const { data, loading } = useQuery(GET_USER, {
        variables: {
            id: getUser().id
        }
    })
    if (data)
        console.log(data.user);

    return (
        <>
            {data ?
                <div className="container__invitations">
                    <div className='container__header'>
                        <p>Invitations</p>
                        <button>Manage</button>
                    </div>
                    <div className='container__cards'>
                        {data.user.request_connect ?
                            data.user.request_connect.length != 0 ?
                                data.user.request_connect.map((user: any) =>
                                    <>
                                        <hr />
                                        <ProfileCard props={user} />
                                    </>
                                ) : ""
                            : ""
                        }
                    </div>
                </div>
                : ""}
        </>

    )
}