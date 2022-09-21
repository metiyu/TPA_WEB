
import Feed from '../../components/feed/Feed'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Widgets from '../../components/widgets/Widgets'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import { UseCurrentUser } from '../../contexts/userCtx'
import '../styles.css'

export default function Homepage() {
    const { user } = UseCurrentUser()
    console.log(user);

    const { getTheme, getThemeFromStorage } = UseCurrentTheme()
    console.log(getTheme());
    const themeLoad = localStorage.getItem("theme") || ""
        console.log(themeLoad == "\"light\"");
    

    return (
        <div className="app" style={{ ...getTheme() }}>
            <>
                <Header />
                <div className="app__body">
                    <Sidebar />
                    <Feed />
                    <Widgets />
                </div>
            </>
        </div>
    )
}