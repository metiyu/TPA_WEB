
import Feed from '../../components/feed/Feed'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Widgets from '../../components/widgets/Widgets'
import { UseCurrentUser } from '../../contexts/userCtx'
import '../styles.css'

export default function Homepage() {
    const {user} = UseCurrentUser()
    console.log(user);
    
    return (
        <div className="app">
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