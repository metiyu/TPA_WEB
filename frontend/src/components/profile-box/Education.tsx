import { useState } from "react";
import "./Analytics.css"
import './Edu_Exp.css'
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HeaderOption from "../header/HeaderOption";
import EditProfile from "../popup/edit-profile/EditProfile";
import EducationModal from "./modal/EducationModal";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EDUCATION, DELETE_EDUCATION, UPDATE_EDUCATION } from "../../mutation-queries";
import { UseCurrentUser } from "../../contexts/userCtx";
import toast, { Toaster } from "react-hot-toast";
import { GET_EDUCATION } from "../../query-queries";
import EducationCard from "./EducationCard";

export default function Education({ dataCurrUser, dataNonCurrUser, refetchCurrUser }: { dataCurrUser: any, dataNonCurrUser: any, refetchCurrUser: any }) {
    const { id } = useParams()
    const [dropdownClassname, setDropdownClassname] = useState("edit__education_invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")

    function handleShowEditEducation() {
        if (dropdownClassname == "edit__education_invisible") {
            setDropdownClassname("edit__education_show")
            setGreyBackground("overlay_show")
        }
        else {
            setDropdownClassname("edit__education_invisible")
            setGreyBackground("overlay_invisible")
        }
    }

    const [school, setSchool]: any = useState("")
    const [degree, setDegree]: any = useState("")
    const [startDate, setStartDate]: any = useState("")
    const [endDate, setEndDate]: any = useState("")
    const [type, setType]: any = useState()
    const [educationId, setEducationId]: any = useState()

    const { getUser } = UseCurrentUser()

    const [createEducationQuery] = useMutation(CREATE_EDUCATION)
    function handleAddEducation() {
        handleShowEditEducation()
        setType("add")
        if (validation()) {
            createEducationQuery({
                variables: {
                    userID: getUser().id,
                    school: school,
                    degree: degree,
                    startDate: startDate,
                    endDate: endDate
                }
            }).then((e) => {
                console.log(e);
                toast.success("Success")
                refetchCurrUser()
            })
        }
    }

    const [editEducationQuery] = useMutation(UPDATE_EDUCATION)
    const [isRefetch, setIsRefetch] = useState(false)
    function handleEditEducation(e: any) {
        console.log(e);
        handleShowEditEducation()
        setType("edit")
        if (e != undefined) {
            setEducationId(e.id)
            setSchool(e.school)
            setDegree(e.degree)
            setStartDate(e.startDate)
            setEndDate(e.endDate)
        }
        if (validation()) {
            editEducationQuery({
                variables: {
                    educationID: educationId,
                    school: school,
                    degree: degree,
                    startDate: startDate,
                    endDate: endDate
                }
            }).then((e) => {
                console.log(e);
                toast.success("Success")
                setIsRefetch(true)
            })
        }
    }

    const [deleteEducationQuery] = useMutation(DELETE_EDUCATION)
    function handleRemoveEducation(id: any) {
        deleteEducationQuery({
            variables: {
                userID: dataCurrUser.user.id,
                educationID: id
            }
        }).then((e) => {
            console.log(e);
            toast.success("Success")
            refetchCurrUser()
        })
    }

    function validation() {
        if (school == "") {
            toast.error("School is empty")
            return false
        } else if (degree == "") {
            toast.error("Degree is empty")
            return false
        } else if (startDate == "") {
            toast.error("Start date is empty")
            return false
        } else if (endDate == "") {
            toast.error("End date is empty")
            return false
        }
        return true
    }

    return (
        <>
            {dataNonCurrUser && id ?
                dataNonCurrUser.user.profile_viewer != null ?
                    <div className="analytics">
                        <div className="title__container">
                            <h2>Education</h2>
                        </div>
                        <div className="analytics__contents">
                            <div className="analytics__content">
                                {dataNonCurrUser.user.educations ?
                                    dataNonCurrUser.user.educations.map((edu: any) =>
                                        <EducationCard props={edu} handleEdit={undefined} handleRemove={undefined} type={"nonCurrUser"} isRefetch={undefined} />
                                    ) : ""}
                            </div>
                        </div>
                        <div className={dropdownClassname}>
                            <EditProfile />
                        </div>
                        <div id={greyBackground} onClick={() => handleShowEditEducation()}></div>
                    </div> : ""
                :
                dataCurrUser ?
                    dataCurrUser.user.profile_viewer != null ?
                        <>
                            <div className="analytics">
                                <Toaster position="top-right" />
                                <div className="title__container">
                                    <h2>Education</h2>
                                    <HeaderOption Icon={AddIcon} title="" avatar={undefined} onClick={() => handleAddEducation()} />
                                </div>
                                <div className="analytics__contents">
                                    <div className="analytics__content">
                                        {dataCurrUser.user.educations.map((edu: any) =>
                                            <EducationCard props={edu} handleEdit={handleEditEducation} handleRemove={handleRemoveEducation} type={"currUser"} isRefetch={isRefetch} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={dropdownClassname}>
                                <EducationModal
                                    id={educationId}
                                    school={school}
                                    setSchool={setSchool}
                                    degree={degree}
                                    setDegree={setDegree}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    type={type}
                                    add={handleAddEducation}
                                    edit={handleEditEducation}
                                />
                            </div>
                            <div id={greyBackground} onClick={() => handleShowEditEducation()}></div>
                        </> : "" : ""
            }
        </>
    )
}