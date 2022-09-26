import React, { forwardRef, useEffect, useState } from "react";
import "./Post.css";
import Avatar from '@mui/material/Avatar';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InputOption from "../input/InputOption";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_COMMENTS, GET_USER, SEARCH_CONNECTED_USER_QUERY } from "../../query-queries";
import { COMMENT_POST, LIKE_POST, SHARE_POST, UNLIKE_POST } from "../../mutation-queries";
import { UseCurrentUser } from "../../contexts/userCtx";
import Comment from "./Comment";
import RichText from "../richtext/RichText";
import HoverProfile from "../hover-modal/HoverProfile";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";

const Post = forwardRef(({ props, refetch }: { props: any, refetch: any }, ref: any) => {    
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
        { loading: loading2, data: data2, fetchMore, refetch: refetchComment }
    ] = queryMultiple()

    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        if (props.comments == null) {
            setHasMore(false)
        } else if (props.comments) {
            if (props.comments.length <= 1) {
                setHasMore(false)
            }
        }
    }, [])

    function handleLoadMore() {
        fetchMore({
            variables: {
                offset: data2.getComment.length
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                let check = false;
                if (previousResult.getComment.length + fetchMoreResult.getComment.length == props.comments.length) {
                    setHasMore(false)
                }
                for (let i = 0; i < previousResult.getComment.length; i++) {
                    for (let j = 0; j < fetchMoreResult.getComment.length; j++) {
                        if (previousResult.getComment[i].id === fetchMoreResult.getComment[j].id) {
                            check = true
                        }
                    }
                }
                if (check === true || fetchMoreResult.getComment.length == 0) {
                    return previousResult
                } else {
                    setHasMore(true)
                    return { getComment: [...previousResult.getComment, ...fetchMoreResult.getComment] }
                }
            }
        }).then((e) => {
            console.log(e);
        }).catch((err) => {
            setHasMore(false)
            console.log(err);
        })
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
            refetch()
            addDoc(collection(db, "user", props.userId, "notification"), {
                createdAt: new Date(),
                type: "like",
                from_id: getUser().id
            })
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
            refetch()
            // window.location.reload()
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
            commentFunc({
                variables: {
                    postId: props.id,
                    commenterId: getUser().id,
                    comment: comment
                }
            }).then((e) => {
                console.log(e);
                refetch()
                addDoc(collection(db, "user", props.userId, "notification"), {
                    createdAt: new Date(),
                    type: "comment",
                    from_id: getUser().id
                })
            })
        }
    }

    const [popupClassname, setPopupClassname] = useState("post__popup_share_hide")
    function handleShare() {
        if (popupClassname == "post__popup_share_hide") {
            setPopupClassname("post__popup_share_show")
        } else {
            setPopupClassname("post__popup_share_hide")
        }
    }

    const [searchUser, { data: searchData, loading: searchLoading }] = useLazyQuery(SEARCH_CONNECTED_USER_QUERY)
    const [keyword, setKeyword] = useState("")
    function handleSearchConnectedUser(e: any) {
        setKeyword(e)
        searchUser({
            variables: {
                id: getUser().id,
                keyword: e
            }
        })
    }

    function checkIsLike() {
        if (props.likes) {
            if (props.likes.includes(getUser().id))
                return true
        }
        return false
    }

    const [hovered, setHovered] = useState("hide_hover")

    const [roomID, setRoomID] = useState("")
    // const [sharePostFunc] = useMutation(SHARE_POST)
    function sharePost(search: any) {
        const q = query(collection(db, "rooms"))
        onSnapshot(q, (docs) => {
            docs.forEach(doc => {
                if (doc.data().users_id.includes(getUser().id) && doc.data().users_id.includes(search.id))
                    setRoomID(doc.id)
            })
        })

        addDoc(collection(db, "rooms", roomID, "chats"), {
            createdAt: new Date(),
            sender: getUser().id,
            post: props.id
        }).then((e) => {
            console.log(e);
            // sharePostFunc({
            //     variables: {
            //         postId: props.id
            //     }
            // })
        })
    }

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
                        <div onClick={() => handleShare()}>
                            <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
                        </div>
                        {/* <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" /> */}
                    </div>
                    <div className={popupClassname}>
                        <input type="text" placeholder="Search user..." onChange={(e) => handleSearchConnectedUser(e.target.value)} />
                        <div className='search_connected_user__container'>
                            {searchData ?
                                searchData.searchConnectedUser != undefined ?
                                    searchData.searchConnectedUser.map((search: any) =>
                                        search.id != getUser().id ?
                                            <div onClick={() => sharePost(search)}>
                                                <p>{search.name}</p>
                                                <hr />
                                            </div>
                                            : ""
                                    )
                                    : "" : ""}
                        </div>
                    </div>
                    <div className="post__comment">
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => handleComment(e)} />
                        {data2 ?
                            data2.getComment ?
                                data2.getComment.map((comment: any) =>
                                    <Comment props={comment} key={comment.id} refetch={refetchComment} />
                                ) : "" : ""}
                        {hasMore ?
                            <button onClick={() => handleLoadMore()}>load more</button> : ""}
                    </div>
                </div>
            ) : (
                ""
            )}

        </>
    );
});

export default Post;