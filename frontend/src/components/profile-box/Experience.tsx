import { useState } from "react";
import "./Analytics.css"
import './Edu_Exp.css'
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import HeaderOption from "../header/HeaderOption";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Experience({ dataCurrUser, dataNonCurrUser }: { dataCurrUser: any, dataNonCurrUser: any }) {
    const { id } = useParams()

    function handleAddExperience(){
        
    }

    function handleEditExperience() {

    }

    function handleRemoveExperience() {

    }


    return (
        <>
            {dataNonCurrUser && id ?
                dataNonCurrUser.user.profile_viewer != null ?
                    <div className="analytics">
                        <h2>Experience</h2>
                        <div className="analytics__contents">
                            <div className="analytics__content">
                                {/* map */}
                                <div className="edit_remove__container">
                                    <div className="text__content">
                                        <h4>Jobs</h4>
                                        <p>Company</p>
                                        <p>2022 - 2025</p>
                                        <small>Jakarta, Indonesia</small>
                                    </div>
                                    <div className="edit_remove__button">
                                        <HeaderOption Icon={EditIcon} title="" avatar={undefined} onClick={() => handleEditExperience()} />
                                        <HeaderOption Icon={RemoveCircleOutlineIcon} title="" avatar={undefined} onClick={() => handleRemoveExperience()} />
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
                                <h2>Experience</h2>
                                <HeaderOption Icon={AddIcon} title="" avatar={undefined} onClick={() => handleEditExperience()} />
                            </div>
                            <div className="analytics__contents">
                                <div className="analytics__content">
                                    {/* map */}
                                    <div className="edit_remove__container">
                                        <div className="text__content">
                                            <h4>Jobs</h4>
                                            <p>Company</p>
                                            <p>2022 - 2025</p>
                                            <small>Jakarta, Indonesia</small>
                                        </div>
                                        <div className="edit_remove__button">
                                            <HeaderOption Icon={EditIcon} title="" avatar={undefined} onClick={() => handleEditExperience()} />
                                            <HeaderOption Icon={RemoveCircleOutlineIcon} title="" avatar={undefined} onClick={() => handleRemoveExperience()} />
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