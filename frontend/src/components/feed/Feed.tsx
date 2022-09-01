import { useEffect, useRef, useState } from "react";
import "./Feed.css";
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import InputOption from "../input/InputOption";
import Post from "../post/Post";
import { UseCurrentTheme } from "../../contexts/themeCtx";
import CreatePost from "./CreatePost";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_POSTS, GET_USER } from "../../query-queries";
import { UseCurrentUser } from "../../contexts/userCtx";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

function Feed() {
    const { getTheme } = UseCurrentTheme()
    const [dropdownClassname, setDropdownClassname] = useState("create_post__invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")

    function handleShowCreatePost() {
        if (dropdownClassname == "create_post__invisible") {
            setDropdownClassname("create_post__show")
            setGreyBackground("overlay_show")
        }
        else {
            setDropdownClassname("create_post__invisible")
            setGreyBackground("overlay_invisible")
        }
    }

    const { limit } = useParams()
    const { getUser } = UseCurrentUser()
    const { data, loading, fetchMore } = useQuery(GET_POSTS, {
        variables: {
            id: getUser().id,
            limit: 5,
            offset: 0
        }
    })
    const [getUserById] = useLazyQuery(GET_USER)

    function handleLoadMore() {
        fetchMore({
            variables: {
                offset: data.getPosts.length
            }
        })
    }

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        console.log(data);
        const onScroll: EventListener = (event: Event) => {
            if (ref) {
                if (ref?.current?.offsetHeight) {
                    if (window.innerHeight + window.scrollY >= ref?.current?.offsetHeight) {
                        handleLoadMore()
                    }
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <>
            {loading ?
                <div className="loading__feed">
                    <ThreeCircles
                        height="100"
                        width="100"
                        color="#0b65c3"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                </div>
                :
                <>
                    <div id={greyBackground} onClick={() => handleShowCreatePost()}></div>
                    <div className={dropdownClassname}>
                        <CreatePost />
                    </div>
                    <div className="feed" style={{ ...getTheme() }}>
                        <div className="feed__inputContainer">
                            <div className="feed__input" onClick={() => handleShowCreatePost()}>
                                <CreateIcon />
                            </div>
                            {/* <div className="feed__inputOptions">
                                <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                                <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                                <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                                <InputOption
                                    Icon={CalendarViewDayIcon}
                                    title="Write article"
                                    color="#7FC15E"
                                />
                            </div> */}
                        </div>
                        <div className="post__container" ref={ref}>
                            {data ?
                                data.getPosts.map((post: any) =>
                                    <Post
                                        key={post.id}
                                        props={post}
                                    />
                                ) : ""
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Feed;
