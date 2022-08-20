import Header from '../../components/header/Header'
import Invitations from '../../components/invitations/Invitations'
import { UseCurrentTheme } from '../../contexts/themeCtx'
import '../styles.css'

export default function MyNetwork() {
    const { getTheme } = UseCurrentTheme()
    return (
        <div className="app" style={{ ...getTheme() }}>
            <>
                <Header />
                <div className='app__body'>
                    <Invitations />
                </div>
            </>
        </div>
    )
}