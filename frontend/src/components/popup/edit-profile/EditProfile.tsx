import { useState } from 'react'
import { UseCurrentUser } from '../../../contexts/userCtx'
import ProfileBox from '../../profile-box/ProfileBox'
import './EditProfile.css'

export default function EditProfile() {
    const { getUser } = UseCurrentUser()
    const user = getUser()

    const [username, setUsername] = useState(user.name)
    const [userwork, setUserwork] = useState(user.work)
    const [userregion, setUserregion] = useState(user.region)
    const [photoprofile, setPhotoprofile] = useState(null)

    return (
        <div className='edit_profile'>
            <div className='exit_button'>
                <span>✖</span>
            </div>
            <div className="form__group field">
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                <label htmlFor="name" className="form__label">Name</label>
            </div>
            <div className="form__group field">
                <input value={userwork} onChange={(e) => setUserwork(e.target.value)} type="input" className="form__field" placeholder="Work" name="work" id='work' required />
                <label htmlFor="name" className="form__label">Work</label>
            </div>
            <div className="form__group field">
                <input value={userregion} onChange={(e) => setUserregion(e.target.value)} type="input" className="form__field" placeholder="Region" name="region" id='region' required />
                <label htmlFor="name" className="form__label">Region</label>
            </div>
            <div className="form__group field">
                <label htmlFor="name" className="form__label">Region</label>
                <input
                    type="file"
                    id="userPhoto"
                    name="userPhoto"
                    // className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    onChange={(e) => setPhotoprofile(e.target.files[0])}
                />
            </div>
        </div>
    )
}