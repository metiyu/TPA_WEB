import { useState } from "react";
import "./Analytics.css"
import './Edu_Exp.css'
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HeaderOption from "../header/HeaderOption";

export default function Education({ dataCurrUser, dataNonCurrUser }: { dataCurrUser: any, dataNonCurrUser: any }) {
    const { id } = useParams()

    function handleAddEducation() {

    }

    function handleEditEducation() {

    }

    function handleRemoveEducation() {

    }

    return (
        <>
            {dataNonCurrUser && id ?
                dataNonCurrUser.user.profile_viewer != null ?
                    <div className="analytics">
                        <div className="title__container">
                            <h2>Education</h2>
                            <HeaderOption Icon={AddIcon} title="" avatar={undefined} onClick={() => handleAddEducation()} />
                        </div>
                        <div className="analytics__contents">
                            <div className="analytics__content">
                                {/* map */}
                                <div className="edit_remove__container">
                                    <div className="text__content">
                                        <h4>School</h4>
                                        <p>2022 - 2025</p>
                                    </div>
                                    <div className="edit_remove__button">
                                        <HeaderOption Icon={EditIcon} title="" avatar={undefined} onClick={() => handleEditEducation()} />
                                        <HeaderOption Icon={RemoveCircleOutlineIcon} title="" avatar={undefined} onClick={() => handleRemoveEducation()} />
                                    </div>
                                </div>
                                {/*  */}
                            </div>
                        </div>
                    </div> : ""
                :
                dataCurrUser ?
                    dataCurrUser.user.profile_viewer != null ?
                        <div className="analytics">
                            <div className="title__container">
                                <h2>Education</h2>
                                <HeaderOption Icon={AddIcon} title="" avatar={undefined} onClick={() => handleEditEducation()} />
                            </div>
                            <div className="analytics__contents">
                                <div className="analytics__content">
                                    {/* map */}
                                    <div className="edit_remove__container">
                                        <div className="text__content">
                                            <h4>School</h4>
                                            <p>2022 - 2025</p>
                                        </div>
                                        <div className="edit_remove__button">
                                            <HeaderOption Icon={EditIcon} title="" avatar={undefined} onClick={() => handleEditEducation()} />
                                            <HeaderOption Icon={RemoveCircleOutlineIcon} title="" avatar={undefined} onClick={() => handleRemoveEducation()} />
                                        </div>
                                    </div>
                                    {/*  */}
                                </div>
                            </div>
                        </div> : "" : ""
            }
        </>
    )
}