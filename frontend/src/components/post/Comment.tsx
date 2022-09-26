import { useMutation, useQuery } from '@apollo/client';
import { Avatar } from '@mui/material'
import { GET_USER } from '../../query-queries';
import InputOption from '../input/InputOption';
import './Comment.css'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { LIKE_COMMENT, UNLIKE_COMMENT } from '../../mutation-queries';
import { UseCurrentUser } from '../../contexts/userCtx';
import { SuggestionDataItem } from 'react-mentions';
import RichText from '../richtext/RichText';

export default function Comment({ props, refetch, setComment }: { props: any, refetch: any, setComment: any }) {
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

    function handleReply() {
        setComment(`@[@${data.user.name}](${data.user.id})`)
    }

    return (
        <>
            {data ? (
                <div className='comment__container__outer'>
                    <div className="comment__container">
                        <Avatar src={data.user.photo_profile} />
                        <div className='comment__name_comment'>
                            <h4>{data.user.name}</h4>
                            <RichText texts={props.comment} />
                            {/* <p>{props.comment}</p> */}
                        </div>
                    </div>
                    {props.likes ?
                        props.likes.length != 0 ?
                            <p>{props.likes.length} Likes</p>
                            : ""
                        : ""
                    }
                    <div style={{ display: "flex" }}>
                        {checkIsLike() ?
                            <div onClick={() => handleUnlike()}><InputOption Icon={ThumbUpAltIcon} title="Like" color="#0b65c3" /></div>
                            :
                            <div onClick={() => handleLike()}><InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" /></div>
                        }
                        <div onClick={() => handleReply()}><InputOption Icon={ReplyIcon} title="Reply" color="#0b65c3" /></div>
                    </div>
                </div>
            ) : ("")}
        </>
    )
}