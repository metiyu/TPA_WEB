import { useQuery } from "@apollo/client";
import { Avatar } from "@mui/material";
import { GET_USER } from "../../query-queries";
import './JobsCard.css'

export default function JobsCard({ props }: { props: any }) {
    const { data } = useQuery(GET_USER, {
        variables: {
            id: props.creatorId
        }
    })

    return (
        <>
            {data ?
                <div className="container__jobs_card">
                    <Avatar className="avatar" src={data.user.photo_profile} />
                    <div className="card__description">
                        <p className="position">Position: {props.position}</p>
                        <p className="company">Company: {props.company}</p>
                        <p className="location">Location: {props.location}</p>
                        <small>From: {data.user.name}</small>
                    </div>
                </div> : ""}
        </>
    )
}