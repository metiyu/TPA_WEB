import { useState } from "react";
import "./Analytics.css"
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

export default function Analytics() {
    const [viewsCount, setViewCount] = useState(34)
    const [searchedCount, setSearchedCount] = useState(10)
    return (
        <div className="analytics">
            <h2>Analytics</h2>

            <RemoveRedEyeIcon /><p>private to you</p>
            <div className="analytics__contents">
                <div className="analytics__content">
                    <div className="text__content">
                        <h4>{viewsCount} profile views</h4>
                        <p>Discover who's viewed your profile.</p>
                    </div>
                </div>
                <div className="analytics__content">
                    <div className="text__content">
                        <h4>{searchedCount} search appearances</h4>
                        <p>See how often you appear in search results.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}