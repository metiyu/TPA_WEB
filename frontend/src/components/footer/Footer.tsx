import { useNavigate } from 'react-router-dom'
import './Footer.css'
import logo from '../../assets/logo.png'

export default function Footer() {
    const links = [
        { title: "About", link: "https://about.linkedin.com/" },
        { title: "Accessibility", link: "https://www.linkedin.com/accessibility" },
        { title: "Safety Center", link: "https://safety.linkedin.com/" },
        { title: "Community Guidelines", link: "https://www.linkedin.com/legal/professional-community-policies" },
        { title: "Careers", link: "https://careers.linkedin.com/" }
    ]
    
    return (
        <footer className="footer__allpages">
            {links.map((item) => (
                <a className="link" onClick={() => window.open(item.link)} key={item.link}>{item.title}</a>
            ))}
            <div className='footer__logo_container'>
                <img className="logo" src={logo} alt="logo.png" />
                <p>LinkHEdIn Corporation © 2022</p>
            </div>
        </footer>
    )
}