import { useNavigate } from 'react-router-dom'
import './Footer.css'
import logo from '../../assets/logo.png'

export default function Footer() {
    const links = [
        { title: "Home", link: "/feed" },
        { title: "My Network", link: "/mynetwork" },
        { title: "Jobs", link: "/feed" },
        { title: "Message", link: "/message" },
        { title: "Profile", link: "/profile" }
    ]
    const navigate = useNavigate()
    return (
        <footer className="footer__allpages">
            {links.map((item) => (
                <a className="link" onClick={() => navigate(item.link)} key={item.link}>{item.title}</a>
            ))}
            <div className='footer__logo_container'>
                <img className="logo" src={logo} alt="logo.png" />
                <p>LinkHEdIn Corporation © 2022</p>
            </div>
        </footer>
    )
}