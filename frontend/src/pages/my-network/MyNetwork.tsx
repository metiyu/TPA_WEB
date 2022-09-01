import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Invitations from '../../components/invitations/Invitations'
import UserYouMightKnow from '../../components/you-might-know/UserYouMightKnow'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import '../styles.css'

export default function MyNetwork() {
    const { getTheme } = UseCurrentTheme()
    return (
        <div className="app" style={{ ...getTheme() }}>
            <>
                <Header />
                <div className='profile__body'>
                    <Invitations />
                    <UserYouMightKnow />
                    <Footer />
                </div>
            </>
        </div>
    )
}