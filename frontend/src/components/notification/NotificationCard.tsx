import { useQuery } from "@apollo/client";
import { Avatar } from "@mui/material";
import { GET_USER } from "../../query-queries";
import './NotificationBox.css'

export default function NotificationCard({ props }: { props: any }) {
    console.log(props);
    const { data } = useQuery(GET_USER, {
        variables: {
            id: props.from_id
        }
    })

    return (
        <>
            {data ?
                <div className="notification_card">
                    <Avatar src={data.user.photo_profile} />
                    {props.type == "like" ? //
                        <p>{data.user.name} liked your post</p> :
                        props.type == "comment" ? //
                            <p>{data.user.name} has commented on your post</p> :
                            props.type == "chat" ? //
                                <p>{data.user.name} has sent you a chat</p> :
                                props.type == "follow" ?
                                    <p>{data.user.name} has followed you</p> :
                                    props.type == "connect" ? //
                                        <p>{data.user.name} has been sent you a connect request</p> : ""
                    }
                </div>
                : ""}
        </>
    )
}