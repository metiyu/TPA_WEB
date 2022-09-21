import React, { forwardRef, useEffect, useState } from "react";
import "./Post.css";
import Avatar from '@mui/material/Avatar';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InputOption from "../input/InputOption";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENTS, GET_USER } from "../../query-queries";
import { COMMENT_POST, LIKE_POST, UNLIKE_POST } from "../../mutation-queries";
import { UseCurrentUser } from "../../contexts/userCtx";
import Comment from "./Comment";
import RichText from "../richtext/RichText";
import HoverProfile from "../hover-modal/HoverProfile";

const Post = forwardRef(({ props }: { props: any }, ref: any) => {
    const { getUser } = UseCurrentUser()
    const queryMultiple = () => {
        const res1 = useQuery(GET_USER, {
            variables: {
                id: props.userId
            }
        })
        const res2 = useQuery(GET_COMMENTS, {
            variables: {
                postId: props.id,
                limit: 2,
                offset: 0,
            }
        })
        return [res1, res2];
    }

    const [
        { loading: loading1, data: data1 },
        { loading: loading2, data: data2, fetchMore }
    ] = queryMultiple()

    function handleLoadMore() {
        // fetchMore({
        //     variables: {
        //         postId: props.id,
        //         offset: data2.getComment.length
        //     }
        // })
        console.log(data2);

    }

    const [likepostFunc] = useMutation(LIKE_POST)
    function handleLike() {
        likepostFunc({
            variables: {
                id: props.id,
                likerId: getUser().id,
            }
        }).then((e) => {
            console.log(e);
            window.location.reload()
        })
    }

    const [unlikeFunc] = useMutation(UNLIKE_POST)
    function handleUnlike() {
        unlikeFunc({
            variables: {
                id: props.id,
                unlikerId: getUser().id,
            }
        }).then((e) => {
            console.log(e);
            window.location.reload()
        })
    }

    // const { data, loading } = useQuery(GET_COMMENTS, {
    //     variables: {
    //         postId: props.id
    //     }
    // })
    const [comment, setComment] = useState("")
    const [commentFunc] = useMutation(COMMENT_POST)
    function handleComment(e: any) {
        if (e.code == "Enter") {
            console.log(props.id);
            console.log(getUser().id);
            console.log(comment);

            commentFunc({
                variables: {
                    postId: props.id,
                    commenterId: getUser().id,
                    comment: comment
                }
            }).then((e) => {
                console.log(e);
                window.location.reload()
            })
        }
    }

    function handleShare() {
        console.log("share");
    }


    function checkIsLike() {
        if (props.likes) {
            if (props.likes.includes(getUser().id))
                return true
        }
        return false
    }

    const [hovered, setHovered] = useState("hide_hover")

    return (
        <>
            {data1 ? (
                <div ref={ref} className="post">
                    <div className="post__header" onMouseEnter={() => setHovered("show_hover")} onMouseLeave={() => setHovered("hide_hover")}>
                        <Avatar src={data1.user.photo_profile}>{data1.user.name}</Avatar>
                        <div className="post__info">
                            <h2>{data1.user.name}</h2>
                            <p>{data1.user.work}</p>
                        </div>
                    </div>
                    <div className={hovered}>
                        <HoverProfile currUser={props.userId} />
                    </div>
                    <div className="post__body">
                        {/* <p>{props.caption}</p> */}
                        <RichText texts={props.caption} />
                        {props.photo_url == "" ?
                            ""
                            :
                            <img src={props.photo_url}></img>
                        }
                        {props.video_url == "" ?
                            ""
                            :
                            <video src={props.video_url} controls></video>
                        }
                    </div>
                    <div className="post__counter">
                        {props.likes ?
                            props.likes.length != 0 ?
                                <>
                                    <p>{props.likes.length} Likes</p>
                                    <p>•</p>
                                </>
                                : ""
                            : ""
                        }
                        {props.comments ?
                            props.comments.length != 0 ?
                                <>
                                    <p>{props.comments.length} Comments</p>
                                    <p>•</p>
                                </>
                                : ""
                            : ""
                        }
                        {props.sends ?
                            props.sends.length != 0 ?
                                <>
                                    <p>{props.sends.length} Shares</p>
                                </>
                                : ""
                            : ""
                        }
                    </div>
                    <div className="post__buttons">
                        {checkIsLike() ?
                            <div onClick={() => handleUnlike()}><InputOption Icon={ThumbUpAltIcon} title="Like" color="#0b65c3" /></div>
                            :
                            <div onClick={() => handleLike()}><InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" /></div>
                        }
                        <div><InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" /></div>
                        <div onClick={() => handleShare()}><InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" /></div>
                        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
                    </div>
                    <div className="post__comment">
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => handleComment(e)} />
                        {data2 ?
                            data2.getComment ?
                                data2.getComment.map((comment: any) =>
                                    <Comment props={comment} key={comment} />
                                ) : "" : ""}
                        <button onClick={() => handleLoadMore()}>load more</button>
                    </div>
                </div>
            ) : (
                ""
            )}

        </>
    );
});

export default Post;