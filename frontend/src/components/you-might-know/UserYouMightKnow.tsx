import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { UseCurrentUser } from "../../contexts/userCtx"
import { GET_USER, USER_YOU_MIGHT_KNOW_QUERY } from "../../query-queries"
import PeopleCard from "../card/PeopleCard"
import ProfileCard from "../invitations/ProfileCard"

export default function UserYouMightKnow() {
    const { getUser } = UseCurrentUser()
    const { data, loading } = useQuery(USER_YOU_MIGHT_KNOW_QUERY, {
        variables: {
            id: getUser().id
        }
    })

    if (data)
        console.log(data);


    return (
        <div className="container__invitations">
            <div className='container__header'>
                <p>User You Might Know</p>
                <button>Manage</button>
            </div>
            <div className='container__cards'>
                {getUser().connected_user ?
                    data ?
                        data.userYouMightKnow.map((user: any) =>
                            <>
                                <hr />
                                <PeopleCard props={user} key={user}/>
                            </>
                        ) : "" : ""
                }
            </div>
        </div>
    )
}