import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import FlipMove from "react-flip-move";
import InputOption from "../input/InputOption";
import Post from "../post/Post";

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

    return (
        <div className="feed">
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
