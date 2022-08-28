import { useQuery } from '@apollo/client';
import { Avatar } from '@mui/material'
import { GET_USER } from '../../query-queries';
import './Comment.css'

export default function Comment({ props }: { props: any }) {
    console.log(props);

    const { data, loading } = useQuery(GET_USER, {
        variables: {
            id: props.userId
        }
    })

    return (
        <>
            {data ? (
                <div className="comment__container">
                    <Avatar src={data.user.photo_profile} />
                    <div className='comment__name_comment'>
                        <h4>{data.user.name}</h4>
                        <p>{props.comment}</p>
                    </div>
                </div>
            ) : ("")}
        </>
    )
}