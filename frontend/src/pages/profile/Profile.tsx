import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Analytics from "../../components/profile-box/Analytics";
import ProfileBox from "../../components/profile-box/ProfileBox";
import { UseCurrentTheme } from "../../contexts/themeCtx";

export default function Profile() {
    const { getTheme } = UseCurrentTheme()
    return (
        <div className="app" style={{ ...getTheme() }}>
            <>
                <Header />
                <div className="profile__body">
                    <ProfileBox />
                    <Analytics />
                    <Footer />
                </div>
            </>
        </div>
    )
}