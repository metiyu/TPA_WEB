import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HeaderOption from "./HeaderOption";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
    const navigate = useNavigate()
    const [dropdownClassname, setDropdownClassname] = useState("invisible")

    function handleDropdown(){
        if(dropdownClassname == "invisible"){
            setDropdownClassname("drop")
        }
        else{
            setDropdownClassname("invisible")
        }
    }

    return (
        <div className='header__outer'>
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
                    <HeaderOption Icon={HomeIcon} title="Home" avatar={undefined} onClick={() => navigate('/feed')} />
                    <HeaderOption Icon={SupervisorAccountIcon} title="My Network" avatar={undefined} onClick={() => navigate('/mynetwork')} />
                    <HeaderOption Icon={BusinessCenterIcon} title="Jobs" avatar={undefined} onClick={undefined} />
                    <HeaderOption Icon={ChatIcon} title="Message" avatar={undefined} onClick={() => navigate('/message')} />
                    <HeaderOption Icon={NotificationsIcon} title="Notifications" avatar={undefined} onClick={undefined} />
                    <HeaderOption avatar={true} title="me" Icon={undefined} onClick={() => handleDropdown()} />
                </div>
            </div>
            <div className={dropdownClassname}>
                <ProfileDropdown />
            </div>
        </div>
    );
}