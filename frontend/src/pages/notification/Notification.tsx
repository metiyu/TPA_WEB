import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import NotificationBox from '../../components/notification/NotificationBox'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import '../styles.css'

export default function Notification() {
    const { getTheme } = UseCurrentTheme()
    return (
        <div className='app' style={{ ...getTheme() }}>
            <>
                <Header />
                <div className='app__body'>
                    <NotificationBox />
                    <Footer />
                </div>
            </>
        </div>
    )
}