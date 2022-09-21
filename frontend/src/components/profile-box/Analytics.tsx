import { useState } from "react";
import "./Analytics.css"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { UseCurrentUser } from "../../contexts/userCtx";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../query-queries";
import { useParams } from "react-router-dom";

export default function Analytics({ dataCurrUser, dataNonCurrUser }: { dataCurrUser: any, dataNonCurrUser: any }) {
    const [viewsCount, setViewCount] = useState(34)
    const [searchedCount, setSearchedCount] = useState(10)
    const { id } = useParams()

    return (
        <>
            {dataNonCurrUser && id ?
                dataNonCurrUser.user.profile_viewer != null ?
                    <div className="analytics">
                        <h2>Analytics</h2>
                        <div className="analytics__contents">
                            <div className="analytics__content">
                                <div className="text__content">
                                    <h4>{dataNonCurrUser.user.profile_viewer.length} profile views</h4>
                                    <p>Discover who's viewed your profile.</p>
                                </div>
                            </div>
                        </div>
                    </div> : ""
                :
                dataCurrUser ?
                    dataCurrUser.user.profile_viewer != null ?
                        <div className="analytics">
                            <h2>Analytics</h2>
                            <div className="analytics__contents">
                                <div className="analytics__content">
                                    <div className="text__content">
                                        <h4>{dataCurrUser.user.profile_viewer.length} profile views</h4>
                                        <p>Discover who's viewed your profile.</p>
                                    </div>
                                </div>
                            </div>
                        </div> : "" : ""
            }
        </>
    )
}