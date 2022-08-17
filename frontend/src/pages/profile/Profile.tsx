import Header from "../../components/header/Header";
import Analytics from "../../components/profile-box/Analytics";
import ProfileBox from "../../components/profile-box/ProfileBox";

export default function Profile(){
    return(
        <div className="app">
            <>
                <Header />
                <div className="profile__body">
                    <ProfileBox />
                    <Analytics />
                </div>
            </>
        </div>
    )
}