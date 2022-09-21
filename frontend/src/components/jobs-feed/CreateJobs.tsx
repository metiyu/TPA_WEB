import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UseCurrentUser } from "../../contexts/userCtx";
import { CREATE_JOBS_QUERY } from "../../mutation-queries";
import './CreateJobs.css'

export default function CreateJobs({refetch}: {refetch: any}) {
    const [btnClassname, setBtnClassname] = useState("post_jobs_button__false")
    const [position, setPosition] = useState("")
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")
    const {getUser} = UseCurrentUser()

    const [createJobs] = useMutation(CREATE_JOBS_QUERY)
    function handleSavePost() {
        createJobs({
            variables: {
                creatorId: getUser().id,
                position: position,
                company: company,
                location: location
            }
        }).then((e) => {
            console.log(e);
            refetch()
            toast.success("Success posted jobs")
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(position == "" || company == "" || location == ""){
            setBtnClassname("post_jobs_button__false")
        }
        else {
            setBtnClassname("post_jobs_button__true")
        }
    })

    return (
        <div className="create_jobs__container">
            <Toaster position="top-right" />
            <div className='create_jobs__title'>
                <p>Post a job </p>
            </div>
            <hr />
            <form>
                <input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Position"
                    type="text"
                />
                <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company"
                    type="text"
                />
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    type="text"
                />
            </form>
            <div className='create_post__button'>
                {btnClassname == "post_jobs_button__false" ?
                    <button className={btnClassname} disabled>Post</button>
                    :
                    <button className={btnClassname} onClick={() => handleSavePost()}>Post</button>
                }
            </div>
        </div>
    )
}