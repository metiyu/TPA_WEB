import { useState } from "react";
import "./Analytics.css"
import './Edu_Exp.css'
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import HeaderOption from "../header/HeaderOption";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./modal/ExperienceModal";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { CREATE_EXPERIENCE, DELETE_EXPERIENCE } from "../../mutation-queries";

export default function Experience({ dataCurrUser, dataNonCurrUser, refetchCurrUser }: { dataCurrUser: any, dataNonCurrUser: any, refetchCurrUser: any }) {
    const { id } = useParams()
    const [dropdownClassname, setDropdownClassname] = useState("edit__experience_invisible")
    const [greyBackground, setGreyBackground] = useState("overlay_invisible")

    function handleShowEditExperience() {
        if (dropdownClassname == "edit__experience_invisible") {
            setDropdownClassname("edit__experience_show")
            setGreyBackground("overlay_show")
        }
        else {
            setDropdownClassname("edit__experience_invisible")
            setGreyBackground("overlay_invisible")
        }
    }

    const [title, setTitle]: any = useState("")
    const [employmentType, setEmploymentType]: any = useState("")
    const [companyName, setCompanyName]: any = useState("")
    const [location, setLocation]: any = useState("")
    const [startDate, setStartDate]: any = useState("")
    const [endDate, setEndDate]: any = useState("")
    const [type, setType]: any = useState()

    const [createExperienceQuery] = useMutation(CREATE_EXPERIENCE)
    function handleAddExperience() {
        handleShowEditExperience()
        setType("add")
        if (validation()) {
            createExperienceQuery({
                variables: {
                    userID: dataCurrUser.user.id,
                    title: title,
                    employmentType: employmentType,
                    companyName: companyName,
                    location: location,
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

    function handleEditExperience() {
        handleShowEditExperience()
        setType("edit")
        validation()
    }

    const [deleteExperienceQuery] = useMutation(DELETE_EXPERIENCE)
    function handleRemoveExperience(id: any) {
        deleteExperienceQuery({
            variables: {
                userID: dataCurrUser.user.id,
                experienceID: id
            }
        }).then((e) => {
            console.log(e);
            toast.success("Success")
            refetchCurrUser()
        })
    }

    function validation() {
        if (title == "") {
            toast.error("School is empty")
            return false
        } else if (employmentType == "") {
            toast.error("Degree is empty")
            return false
        } else if (companyName == "") {
            toast.error("Degree is empty")
            return false
        } else if (location == "") {
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
                        <h2>Experience</h2>
                        <div className="analytics__contents">
                            <div className="analytics__content">
                                {dataNonCurrUser.user.experiences.map((edu: any) =>
                                    <ExperienceCard props={edu} handleEdit={undefined} handleRemove={undefined} type={"nonCurrUser"} />
                                )}
                            </div>
                        </div>
                    </div> : ""
                :
                dataCurrUser ?
                    dataCurrUser.user.profile_viewer != null ?
                        <>
                            <div className="analytics">
                                <div className="title__container">
                                    <h2>Experience</h2>
                                    <HeaderOption Icon={AddIcon} title="" avatar={undefined} onClick={() => handleAddExperience()} />
                                </div>
                                <div className="analytics__contents">
                                    <div className="analytics__content">
                                        {dataCurrUser.user.experiences.map((edu: any) =>
                                            <ExperienceCard props={edu} handleEdit={handleEditExperience} handleRemove={handleRemoveExperience} type={"currUser"} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={dropdownClassname}>
                                <ExperienceModal
                                    title={title}
                                    setTitle={setTitle}
                                    employmentType={employmentType}
                                    setEmploymentType={setEmploymentType}
                                    companyName={companyName}
                                    setCompanyName={setCompanyName}
                                    location={location}
                                    setLocation={setLocation}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    type={type}
                                    add={handleAddExperience}
                                    edit={handleEditExperience}
                                />
                            </div>
                            <div id={greyBackground} onClick={() => handleShowEditExperience()}></div>
                        </> : "" : ""
            }
        </>
    )
}