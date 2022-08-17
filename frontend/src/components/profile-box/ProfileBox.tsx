import { Avatar } from "@material-ui/core";
import './ProfileBox.css'

export default function ProfileBox(){
    return(
        <div className="default__profile">
            <div className="cover__photo"></div>
            <Avatar className="profile__photo" src="https://picsum.photos/200" />
            <h3>Name</h3>
            <h4>Education</h4>
            <div className="sub__information">
                <p>Address</p>
            </div>
            <p className="connection">1 Connection</p>
            <div className="buttons">
                <button>Add experience</button>
                <button>Add education</button>
                <button>Save as pdf</button>
            </div>
        </div>
    )
}