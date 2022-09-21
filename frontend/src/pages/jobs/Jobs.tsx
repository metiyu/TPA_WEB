
import Feed from '../../components/feed/Feed'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import JobsFeed from '../../components/jobs-feed/JobsFeed'
import Sidebar from '../../components/sidebar/Sidebar'
import Widgets from '../../components/widgets/Widgets'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import { UseCurrentUser } from '../../contexts/userCtx'
import '../styles.css'

export default function Jobs() {
    const { user } = UseCurrentUser()
    console.log(user);

    const { getTheme, getThemeFromStorage } = UseCurrentTheme()
    console.log(getTheme());
    const themeLoad = localStorage.getItem("theme") || ""

    return (
        <div className="app" style={{ ...getTheme() }}>
            <>
                <Header />
                <div className="app__body">
                    <JobsFeed />
                    <Footer />
                </div>
            </>
        </div>
    )
}