import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HeaderOption from "./HeaderOption";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UseCurrentTheme } from '../../contexts/themeCtx';
import ProfileDropdown from '../popup/profile-dropdown/ProfileDropdown';

export default function Header() {
    const navigate = useNavigate()
    const [dropdownClassname, setDropdownClassname] = useState("invisible")
    const { changeTheme, theme } = UseCurrentTheme()
    const [search, setSearch] = useState("")

    function handleDropdown(){
        if(dropdownClassname == "invisible"){
            setDropdownClassname("drop")
        }
        else{
            setDropdownClassname("invisible")
        }
    }

    function handleSearch(e: any){
        if(e.code == "Enter"){
            navigate(`/search/all/keyword=${search}/page=1`)
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
                        <input placeholder="Search" type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handleSearch(e)}/>
                    </div>
                </div>

                <div className="header__right">
                    <HeaderOption Icon={HomeIcon} title="Home" avatar={undefined} onClick={() => navigate('/feed')} />
                    <HeaderOption Icon={SupervisorAccountIcon} title="My Network" avatar={undefined} onClick={() => navigate('/mynetwork')} />
                    <HeaderOption Icon={BusinessCenterIcon} title="Jobs" avatar={undefined} onClick={undefined} />
                    <HeaderOption Icon={ChatIcon} title="Message" avatar={undefined} onClick={() => navigate('/message')} />
                    <HeaderOption Icon={NotificationsIcon} title="Notifications" avatar={undefined} onClick={undefined} />
                    <HeaderOption avatar={true} title="me" Icon={undefined} onClick={() => handleDropdown()} />
                    {theme === 'light' ? (
                        <HeaderOption Icon={LightModeIcon} title="Theme" avatar={undefined} onClick={() => changeTheme()} />
                    ) : (
                        <HeaderOption Icon={DarkModeIcon} title="Theme" avatar={undefined} onClick={() => changeTheme()} />
                    )}
                    
                </div>
            </div>
            <div className={dropdownClassname}>
                <ProfileDropdown />
            </div>
        </div>
    );
}