import Header from '../../components/header/Header'
import MessageBox from '../../components/message-box/MessageBox'
import '../styles.css'

export default function Message(){
    return(
        <div className='app'>
            <>
                <Header />
                <div className='app__body'>
                    <MessageBox />
                </div>
            </>
        </div>
    )
}