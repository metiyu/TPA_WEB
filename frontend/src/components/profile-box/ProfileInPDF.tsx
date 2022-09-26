import { useQuery } from "@apollo/client";
import { useRef } from "react";
import { GET_EDUCATION, GET_EXPERIENCE } from "../../query-queries";
// import EducationInPDF from "./EducationInPDF";

//{ props }: { props: any }
export default function ProfileInPDF({ props }: { props: any }) {
    console.log(props);

    const containerStyle: any = {
        padding: '30px'
    }

    const hrStyle: any = {
        paddingTop: '10px',
        paddingBottom: '10px',
    }

    return (
        <div style={containerStyle}>
            <h2>{props.name}</h2>
            {/* <small>Location</small> */}
            <div style={hrStyle}>
                <hr />
            </div>
            <h3>Education</h3>
            {props.educations ?
                props.educations.map((edu: any) =>
                    <EducationInPDF id={edu} />)
                : ""}
            <div style={hrStyle}>
                <hr />
            </div>
            <h3>Experience</h3>
            {props.experiences ?
                props.experiences.map((exp: any) =>
                    <ExperienceInPDF id={exp} />)
                : ""}
            <div style={hrStyle}>
                <hr />
            </div>
            <h3>Contact</h3>
            <p>{props.email}</p>
            <p>{`localhost:3030/profile/${props.id}`}</p>
        </div>
    )
}

function EducationInPDF({ id }: { id: any }) {
    const { data } = useQuery(GET_EDUCATION, {
        variables: {
            id: id
        }
    })

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <>
            {data ?
                <>
                    <p>{data.getEducation.school}</p>
                    <small>{monthNames[new Date(data.getEducation.startDate).getMonth()] + ' ' + new Date(data.getEducation.startDate).getFullYear() + " "}
                        -
                        {" " + monthNames[new Date(data.getEducation.endDate).getMonth()] + ' ' + new Date(data.getEducation.endDate).getFullYear()}
                    </small>
                </> : ""
            }
        </>
    )
}

function ExperienceInPDF({ id }: { id: any }) {
    const { data } = useQuery(GET_EXPERIENCE, {
        variables: {
            id: id
        }
    })

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <>
            {data ?
                <>
                    <p>{data.getExperience.title}</p>
                    <p>{data.getExperience.employmentType}</p>
                    <p>{data.getExperience.companyName}</p>
                    <small>{monthNames[new Date(data.getExperience.startDate).getMonth()] + ' ' + new Date(data.getExperience.startDate).getFullYear() + " "}
                        -
                        {" " + monthNames[new Date(data.getExperience.endDate).getMonth()] + ' ' + new Date(data.getExperience.endDate).getFullYear()}
                    </small>
                </> : ""
            }
        </>
    )
}