import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MessageBox from '../../components/message-box/MessageBox'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import '../styles.css'

export default function Message() {
    const { getTheme } = UseCurrentTheme()
    return (
        <div className='app' style={{ ...getTheme() }}>
            <>
                <Header />
                <div className='app__body'>
                    <MessageBox />
                    <Footer />
                </div>
            </>
        </div>
    )
}