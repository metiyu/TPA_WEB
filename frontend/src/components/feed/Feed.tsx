import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import FlipMove from "react-flip-move";
import InputOption from "../input/InputOption";
import Post from "../post/Post";
import { UseCurrentTheme } from "../../contexts/themeCtx";

function Feed() {
    const [input, setInput] = useState(() => "");
    const [posts, setPosts] = useState(() => []);

    // setPosts([
    //     "0", {
    //         id: "1",
    //         data: {

    //         }
    //     }
    // ])

    // useEffect(() => {
    //     // getData();
    // }, []);

    // const getData = async () => {
    //     // const postsRef = collection(db, "posts");

    //     const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    //     onSnapshot(q, (querySnapshot) => {
    //         const getPosts = [];
    //         querySnapshot.forEach((doc) => {
    //             getPosts.push({ id: doc.id, data: doc.data() });
    //         });
    //         setPosts(
    //             getPosts.map((item) => {
    //                 if (item.data.description === getAuth().currentUser.email) {
    //                     return item;
    //                 }
    //             })
    //         );
    //     });
    // };

    // const sendPost = (e) => {
    //     e.preventDefault();
    //     addDoc(collection(db, "posts"), {
    //         name: user.displayName,
    //         description: user.email,
    //         message: input,
    //         photoUrl: user.photoURL,
    //         timestamp: serverTimestamp()
    //     });

    //     setInput("");
    // };

    const { getTheme } = UseCurrentTheme()

    return (
        <div className="feed" style={{ ...getTheme() }}>
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input
                            type="text"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                        <button /*onClick={sendPost}*/ type="submit">
                            Send
                        </button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                    <InputOption
                        Icon={CalendarViewDayIcon}
                        title="Write article"
                        color="#7FC15E"
                    />
                </div>
            </div>

            {/* Posts */}
            {/* <FlipMove> */}
            <div>
                {posts.map((item) => {
                    if (item) {
                        const {
                            id,
                            data: { name, description, message, photoUrl }
                        } = item;
                        return (
                            <Post
                                key={id}
                                name={name}
                                description={description}
                                message={message}
                                photoUrl={photoUrl}
                            />
                        );
                    }
                })}
            </div>
            {/* </FlipMove> */}
        </div>
    );
}

export default Feed;
