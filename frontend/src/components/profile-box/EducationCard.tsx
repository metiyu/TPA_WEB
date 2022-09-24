import HeaderOption from "../header/HeaderOption";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import "./Analytics.css"
import './Edu_Exp.css'
import { useQuery } from "@apollo/client";
import { GET_EDUCATION } from "../../query-queries";

export default function EducationCard({ props, handleEdit, handleRemove }: { props: any, handleEdit: any, handleRemove: any }) {
    const { data } = useQuery(GET_EDUCATION, {
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
                        <h4>{data.getEducation.school}</h4>
                        <p>{monthNames[new Date(data.getEducation.startDate).getMonth()] + ' ' + new Date(data.getEducation.startDate).getFullYear() + " "}
                            -
                            {" " + monthNames[new Date(data.getEducation.endDate).getMonth()] + ' ' + new Date(data.getEducation.endDate).getFullYear()}
                        </p>
                    </div>
                    <div className="edit_remove__button">
                        <HeaderOption Icon={EditIcon} title="" avatar={undefined} onClick={() => handleEdit()} />
                        <HeaderOption Icon={RemoveCircleOutlineIcon} title="" avatar={undefined} onClick={() => handleRemove()} />
                    </div>
                </div> : ""}
        </>
    )
}