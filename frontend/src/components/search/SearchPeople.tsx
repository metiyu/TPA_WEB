import { Avatar } from '@mui/material'
import { UseCurrentUser } from '../../contexts/userCtx'
import PeopleCard from '../card/PeopleCard'
import './SearchPeople.css'

export default function SearchPeople({ props }: { props: any }) {
    const { getUser } = UseCurrentUser()

    return (
        <div>
            <hr />
            {props == undefined ? (
                ""
            ) : (
                props.search.users.map((user: any) => (
                    user.ID != getUser().id ? (
                        <div>
                            <PeopleCard props={user} />
                            <hr />
                        </div>
                    ) : ("")
                ))
            )}
        </div>
    )
}