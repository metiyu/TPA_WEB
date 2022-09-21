import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_JOBS } from '../../query-queries'
import CreateJobs from './CreateJobs'
import JobsCard from './JobsCard'
import './JobsFeed.css'

export default function JobsFeed() {
    const [dropdownClassname, setDropdownClassname] = useState("create_jobs__invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")

    function handleShowCreatePost() {
        if (dropdownClassname == "create_jobs__invisible") {
            setDropdownClassname("create_jobs__show")
            setGreyBackground("overlay_show")
        }
        else {
            setDropdownClassname("create_jobs__invisible")
            setGreyBackground("overlay_invisible")
        }
    }

    const { data, refetch } = useQuery(GET_JOBS)

    return (
        <>
            {data ?
                <>
                    <div id={greyBackground} onClick={() => handleShowCreatePost()}></div>
                    <div className={dropdownClassname}>
                        <CreateJobs refetch={refetch} />
                    </div>
                    <div className='container__jobs_feed_outer'>
                        <div className="button_post_job">
                            <button onClick={handleShowCreatePost}>Post Job</button>
                        </div>

                        <div className="container__jobs_feed">
                            <div className='container__header'>
                                <p>Jobs</p>
                            </div>
                            <div className='container__cards'>
                                {data.getJobs ?
                                    data.getJobs.length > 0 ?
                                        data.getJobs.map((job: any) =>
                                            <>
                                                <hr />
                                                <JobsCard props={job} />
                                            </>
                                        ) : "" : ""}
                                {/* {data.user.request_connect ?
                data.user.request_connect.length != 0 ?
                    data.user.request_connect.map((user: any) =>
                        <>
                            <hr />
                            <ProfileCard props={user} />
                        </>
                    ) : ""
                : ""
            } */}
                            </div>
                        </div>
                    </div>
                </> : ""}
        </>
    )
}