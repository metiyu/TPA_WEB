import "./Widgets.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

export default function Widgets() {

    const navigate = useNavigate()
    const links = [
        { title: "Home", link: "/feed" },
        { title: "My Network", link: "/mynetwork" },
        { title: "Jobs", link: "/feed" },
        { title: "Message", link: "/message" },
        { title: "Profile", link: "/profile" }
    ]

    return (
        <div className="container__widget">
            <div className="widgets">
                <img src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png" alt="Advertise on LinkedIn"></img>
            </div>
            <footer>
                {links.map((item) => (
                    <a className="link" onClick={() => navigate(item.link)} key={item.link}>{item.title}</a>
                ))}
            </footer>
            <div className="logo__container">
                <img className="logo" src={logo} alt="logo.png" />
                LinkHEdIn Corporation © 2022
            </div>
        </div>
    );
}
