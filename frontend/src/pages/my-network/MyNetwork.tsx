import Header from '../../components/header/Header'
import Invitations from '../../components/invitations/Invitations'
import '../styles.css'

export default function MyNetwork() {
    return (
        <div className="app">
            <>
                <Header />
                <div className='app__body'>
                    <Invitations />
                </div>
            </>
        </div>
    )
}