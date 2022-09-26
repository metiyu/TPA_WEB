import HeaderOption from "../header/HeaderOption";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import "./Analytics.css"
import './Edu_Exp.css'
import { useQuery } from "@apollo/client";
import { GET_EDUCATION } from "../../query-queries";
import { useEffect } from "react";

export default function EducationCard({ props, handleEdit, handleRemove, type, isRefetch }: { props: any, handleEdit: any, handleRemove: any, type: any, isRefetch: any }) {
    const { data, refetch } = useQuery(GET_EDUCATION, {
        variables: {
            id: props
        }
    })

    useEffect(() => {
        if(isRefetch){
            refetch()
        }
    }, [isRefetch])

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
                    {type == "currUser" ?
                        <div className="edit_remove__button">
                            <HeaderOption Icon={EditIcon} title="" avatar={undefined} onClick={() => handleEdit(data.getEducation)} />
                            <HeaderOption Icon={RemoveCircleOutlineIcon} title="" avatar={undefined} onClick={() => handleRemove(data.getEducation.id)} />
                        </div> : ""}
                </div> : ""}
        </>
    )
}