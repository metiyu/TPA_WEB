import { useMutation, useQuery } from '@apollo/client';
import { Avatar } from '@mui/material'
import { GET_USER } from '../../query-queries';
import InputOption from '../input/InputOption';
import './Comment.css'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { LIKE_COMMENT, UNLIKE_COMMENT } from '../../mutation-queries';
import { UseCurrentUser } from '../../contexts/userCtx';

export default function Comment({ props, refetch }: { props: any, refetch: any }) {
    console.log(props);
    const { getUser } = UseCurrentUser()
    const { data, loading } = useQuery(GET_USER, {
        variables: {
            id: props.userId
        }
    })

    const [likecommentFunc] = useMutation(LIKE_COMMENT)
    function handleLike() {
        likecommentFunc({
            variables: {
                commentId: props.id,
                likerId: getUser().id,
            }
        }).then((e) => {
            console.log(e);
            refetch()
            // window.location.reload()
        })
    }

    const [unlikecommentFunc] = useMutation(UNLIKE_COMMENT)
    function handleUnlike() {
        unlikecommentFunc({
            variables: {
                commentId: props.id,
                unlikerId: getUser().id,
            }
        }).then((e) => {
            console.log(e);
            refetch()
            // window.location.reload()
        })
    }

    function checkIsLike() {
        if (props.likes) {
            if (props.likes.includes(getUser().id))
                return true
        }
        return false
    }

    return (
        <>
            {data ? (
                <div className='comment__container__outer'>
                    <div className="comment__container">
                        <Avatar src={data.user.photo_profile} />
                        <div className='comment__name_comment'>
                            <h4>{data.user.name}</h4>
                            <p>{props.comment}</p>
                        </div>
                    </div>
                    {props.likes ?
                        props.likes.length != 0 ?
                            <p>{props.likes.length} Likes</p>
                            : ""
                        : ""
                    }
                    {checkIsLike() ?
                        <div onClick={() => handleUnlike()}><InputOption Icon={ThumbUpAltIcon} title="Like" color="#0b65c3" /></div>
                        :
                        <div onClick={() => handleLike()}><InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" /></div>
                    }
                </div>
            ) : ("")}
        </>
    )
}