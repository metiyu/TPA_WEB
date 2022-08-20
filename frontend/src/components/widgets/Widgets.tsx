import "./Widgets.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import logo from '../../assets/logo.png'

export default function Widgets() {
    const newArticle = (heading: any, subtitle: any) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    const links = [
        { title: "About", link: "https://about.linkedin.com/" },
        { title: "Accesbility", link: "https://www.linkedin.com/accessibility" },
        { title: "Help Center", link: "https://www.linkedin.com/help/linkedin" },
        { title: "Privacy & Terms", link: "https://www.linkedin.com/legal/privacy-policy" },
        { title: "Safety Center", link: "https://safety.linkedin.com/" }
    ]

    return (
        <div className="container__widget">
            <div className="widgets">
                <img src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png" alt="Advertise on LinkedIn"></img>
            </div>
            <footer>
                {links.map((item) => (
                    <a className="link" href={item.link}>{item.title}</a>
                ))}
            </footer>
            <div className="logo__container">
                <img className="logo" src={logo} alt="logo.png" />
                LinkHEdIn Corporation © 2022
            </div>
        </div>
    );
}
