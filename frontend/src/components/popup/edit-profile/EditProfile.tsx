import { ChangeEvent, useEffect, useState } from 'react'
import { UseCurrentUser } from '../../../contexts/userCtx'
import ProfileBox from '../../profile-box/ProfileBox'
import './EditProfile.css'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { useMutation } from '@apollo/client'
import { LOGIN_QUERY, UPDATE_USER } from '../../../queries'

export default function EditProfile() {
    const { getUser, setUserToStorage } = UseCurrentUser()
    const [user, setUser] = useState(getUser())

    const [username, setUsername] = useState(user.name)
    const [userwork, setUserwork] = useState(user.work)
    const [usereducation, setUsereducation] = useState(user.education)
    const [userregion, setUserregion] = useState(user.region)
    const [photoprofileURL, setPhotoprofileURL] = useState("")
    const [backgroundphotoURL, setBackgroundphotoURL] = useState("")

    const [colorsAndImages, setColorsAndImages] = useState<[{ image: object, color: string }]>([{ image: {}, color: '' }])
    const storage = getStorage()

    async function handleSetImage(event: ChangeEvent<HTMLInputElement>, type: string) {
        const files = event.target.files[0];
        console.log(files);
        let photoRef = ref(storage, `lost/${user.id}`)
        if (type === "profile") {
            photoRef = ref(storage, `userPhotoProfile/${user.id}`)
            await uploadBytes(photoRef, files)
            const url = await getDownloadURL(photoRef)
            setPhotoprofileURL(url)
        }
        if (type === "background") {
            photoRef = ref(storage, `userBackgroundPhoto/${user.id}`)
            await uploadBytes(photoRef, files)
            const url = await getDownloadURL(photoRef)
            setBackgroundphotoURL(url)
        }
    }

    async function setProfilePhoto() {
        const photoRef = ref(storage, `userPhotoProfile/${user.id}`)
        const url = await getDownloadURL(photoRef)
        setPhotoprofileURL(url)
    }

    async function setBackgroundPhoto() {
        const photoRef = ref(storage, `userBackgroundPhoto/${user.id}`)
        const url = await getDownloadURL(photoRef)
        setBackgroundphotoURL(url)
    }

    useEffect(() => {
        setProfilePhoto()
        setBackgroundPhoto()
    }, [user.id])

    const [updatePhotoprofile, { data, loading, error }] = useMutation(UPDATE_USER)
    function handleUpdate() {
        updatePhotoprofile({
            variables: {
                id: user.id,
                name: username,
                work: userwork,
                education: usereducation,
                region: userregion,
                profileURL: photoprofileURL,
                backgroundURL: backgroundphotoURL
            },
            
        }).then((e) => {
            console.log("success login");
            console.log(e.data.updateUser);
            if (e && e.data.updateUser.token !== undefined) {
                const user = e.data.updateUser
                console.log(user);
                setUserToStorage(user)
                setUser(getUser())
            }
        }).catch((err) => {
            console.log(err);
        })
    }

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
                <input value={usereducation} onChange={(e) => setUsereducation(e.target.value)} type="input" className="form__field" placeholder="Education" name="education" id='education' required />
                <label htmlFor="Education" className="form__label">Education</label>
            </div>
            <div className="form__group field">
                <input value={userwork} onChange={(e) => setUserwork(e.target.value)} type="input" className="form__field" placeholder="Work" name="work" id='work' required />
                <label htmlFor="work" className="form__label">Work</label>
            </div>
            <div className="form__group field">
                <input value={userregion} onChange={(e) => setUserregion(e.target.value)} type="input" className="form__field" placeholder="Region" name="region" id='region' required />
                <label htmlFor="region" className="form__label">Region</label>
            </div>
            <div className="form__group field">
                <label htmlFor="profile_photo" className="form__label">Profile Photo</label>
                <input type="file" id="userPhoto" name="userPhoto" onChange={(e) => handleSetImage(e, "profile")} />
            </div>
            <div className="form__group field">
                <label htmlFor="background_photo" className="form__label">Background Photo</label>
                <input type="file" id="userPhoto" name="userPhoto" onChange={(e) => handleSetImage(e, "background")} />
            </div>
            <div>
                <button onClick={() => handleUpdate()}>SAVE</button>
            </div>
        </div>
    )
}