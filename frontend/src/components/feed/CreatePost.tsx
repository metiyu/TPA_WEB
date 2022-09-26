import './CreatePost.css'
import ImageIcon from '@mui/icons-material/Image';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import HeaderOption from '../header/HeaderOption';
import { async } from '@firebase/util';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { UseCurrentUser } from '../../contexts/userCtx';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GENERATE_ID, GET_USER } from '../../query-queries';
import { useEffect, useState } from 'react';
import { CREATE_POST_QUERY } from '../../mutation-queries';
import toast, { Toaster } from 'react-hot-toast';
import RichText from '../richtext/RichText';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import { mentionInputPostStyle, mentionStyle } from '../richtext/mentionStyle';

export default function CreatePost({ refetch, mentionDatas }: { refetch: any, mentionDatas: any }) {
    const { getUser } = UseCurrentUser()
    const storage = getStorage()
    const { data, loading } = useQuery(GENERATE_ID)
    const [generatedId, setGeneratedId] = useState("")
    const [postPhotoURL, setPostPhotoURL] = useState("")
    const [postVideoURL, setPostVideoURL] = useState("")
    const [postCaption, setPostCaption] = useState("")
    const [btnClassname, setBtnClassname] = useState("post_button__false")
    const [haveContent, setHaveContent] = useState(false)

    useEffect(() => {
        if (data)
            setGeneratedId(data.generateID);
    }, [loading])

    async function handleSetContent(e: any, type: any) {
        if (haveContent) {
            setPostPhotoURL("")
            setPostVideoURL("")
        }
        setBtnClassname("post_button__false")
        setHaveContent(true)
        const files = e.target.files[0]
        console.log(files);
        let photoRef = ref(storage, `lost/${getUser().id}`)
        if (data) {
            photoRef = ref(storage, `posts/${getUser().id}/${generatedId}`)
            await uploadBytes(photoRef, files)
            if (type === "photo") {
                toast.promise(
                    getDownloadURL(photoRef).then((e) => {
                        setPostPhotoURL(e)
                        if (postCaption != "")
                            setBtnClassname("post_button__true")
                    }), {
                    loading: "Uploading",
                    success: "Uploaded",
                    error: "Error"
                })
            }
            else if (type === "video") {
                toast.promise(
                    getDownloadURL(photoRef).then((e) => {
                        setPostVideoURL(e)
                        if (postCaption != "")
                            setBtnClassname("post_button__true")
                    }), {
                    loading: "Uploading",
                    success: "Uploaded",
                    error: "Error"
                })
            }
        }
    }

    const [createPost] = useMutation(CREATE_POST_QUERY)
    function handleSavePost() {
        console.log("save nih");
        console.log(postPhotoURL);
        toast.promise(
            createPost({
                variables: {
                    id: generatedId,
                    userId: getUser().id,
                    caption: postCaption,
                    photo_url: postPhotoURL,
                    video_url: postVideoURL
                }
            }).then((e) => {
                console.log(e);
                refetch()
                // window.location.reload()
            }).catch((err) => {
                console.log(err);
            }), {
            loading: "Uploading",
            success: "Posted",
            error: "Error"
        })
    }

    function handlePostCaption(e: any) {
        setPostCaption(e)
        if (e == "") {
            setBtnClassname("post_button__false")
        } else {
            setBtnClassname("post_button__true")
        }
    }

    function handleDetach() {
        setPostPhotoURL("")
        setPostVideoURL("")
    }

    console.log(mentionDatas);

    return (
        <div className="create_post__container">
            <Toaster position="top-right" />
            <div className='create_post__title'>
                <p>Create a post</p>
            </div>
            <hr />
            {/* <textarea cols={65}
                rows={5}
                name="text"
                id="text"
                placeholder='What do you want to talk about?'
                value={postCaption}
                onChange={(e) => handlePostCaption(e.target.value)}
            /> */}
            <MentionsInput id='test-rich-text' value={postCaption} style={{ width: "100%", height: "100px", ...mentionInputPostStyle }} placeholder="What do you want to talk about" onChange={(e) => handlePostCaption(e.target.value)}>
                <Mention
                    trigger="@"
                    data={mentionDatas}
                    style={mentionStyle}
                />
                {/* <Mention
                    trigger="#"
                    data={hastagDatas}
                    style={mentionStyle}
                /> */}
            </MentionsInput>
            {postPhotoURL != "" || postVideoURL != "" ?
                <button onClick={() => handleDetach()}>X</button>
                : ""}
            <div>
                <img src={postPhotoURL} alt="" />
            </div>
            {postVideoURL == "" ?
                ""
                :
                <video src={postVideoURL} controls></video>
            }
            <div className='create_post__button'>
                <div className='create_post__logo'>
                    <div className='input__file'>
                        <label htmlFor="postPhoto">
                            <div className='icon'>
                                <ImageIcon />
                            </div>
                        </label>
                        <input className='input_file' type="file" id="postPhoto" name="postPhoto" accept="image/png, image/gif, image/jpeg" onChange={(e) => handleSetContent(e, "photo")} />
                    </div>
                    <div className='input__file'>
                        <label htmlFor="postVideo">
                            <div className='icon'>
                                <SmartDisplayIcon />
                            </div>
                        </label>
                        <input className='input_file' type="file" id="postVideo" name="postVideo" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => handleSetContent(e, "video")} />
                    </div>
                </div>
                {btnClassname == "post_button__false" ?
                    <button className={btnClassname} disabled>Post</button>
                    :
                    <button className={btnClassname} onClick={() => handleSavePost()}>Post</button>
                }
            </div>
        </div>
    )
}