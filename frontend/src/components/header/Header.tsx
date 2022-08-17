import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HeaderOption from "./HeaderOption";

export default function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <img
                    src="https://image.flaticon.com/icons/png/512/174/174857.png"
                    alt=""
                />

                <div className="header__search">
                    <SearchIcon />
                    <input placeholder="Search" type="text" />
                </div>
            </div>

            <div className="header__right">
                <HeaderOption Icon={HomeIcon} title="Home" avatar={undefined} onClick={undefined} />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" avatar={undefined} onClick={undefined} />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" avatar={undefined} onClick={undefined} />
                <HeaderOption Icon={ChatIcon} title="Message" avatar={undefined} onClick={undefined} />
                <HeaderOption Icon={NotificationsIcon} title="Notifications" avatar={undefined} onClick={undefined} />
                <HeaderOption avatar={true} title="me" Icon={undefined} onClick={undefined} />
            </div>
        </div>
    );
}