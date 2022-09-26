import HeaderOption from "../header/HeaderOption";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import "./Analytics.css"
import './Edu_Exp.css'
import { useQuery } from "@apollo/client";
import { GET_EDUCATION, GET_EXPERIENCE } from "../../query-queries";

export default function ExperienceCard({ props, handleEdit, handleRemove, type }: { props: any, handleEdit: any, handleRemove: any, type: any }) {
    const { data } = useQuery(GET_EXPERIENCE, {
        variables: {
            id: props
        }
    })

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <>
            {data ?
                <div className="edit_remove__container">
                    <div className="text__content">
                        <h4>{data.getExperience.title}</h4>
                        <p>{data.getExperience.employmentType}</p>
                        <p>{data.getExperience.companyName}</p>
                        <p>{monthNames[new Date(data.getExperience.startDate).getMonth()] + ' ' + new Date(data.getExperience.startDate).getFullYear() + " "}
                            -
                            {" " + monthNames[new Date(data.getExperience.endDate).getMonth()] + ' ' + new Date(data.getExperience.endDate).getFullYear()}
                        </p>
                        <small>{data.getExperience.location}</small>
                    </div>
                    {type == "currUser" ?
                        <div className="edit_remove__button">
                            <HeaderOption Icon={EditIcon} title="" avatar={undefined} onClick={() => handleEdit()} />
                            <HeaderOption Icon={RemoveCircleOutlineIcon} title="" avatar={undefined} onClick={() => handleRemove(data.getExperience.id)} />
                        </div> : ""}
                </div> : ""}
        </>
    )
}