import { useState } from 'react'
import './Modal.css'

export default function EducationModal(
    {
        school,
        setSchool,
        degree,
        setDegree,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        type,
        add,
        edit
    }:
        {
            school: any,
            setSchool: any,
            degree: any,
            setDegree: any,
            startDate: any,
            setStartDate: any,
            endDate: any,
            setEndDate: any,
            type: any,
            add: any,
            edit: any
        }
) {
    // const [school, setSchool]: any = useState()
    // const [degree, setDegree]: any = useState()
    // const [startDate, setStartDate]: any = useState()
    // const [endDate, setEndDate]: any = useState()

    function handleUpdate() {
        console.log(type);
        if (type == "add")
            add()
        else if (type == "edit")
            edit()
    }

    return (
        <div className="modal__container">
            <div className='modal__title'>
                <span>Education</span>
            </div>
            <div className="form__group field">
                <input value={school} onChange={(e) => setSchool(e.target.value)} type="input" className="form__field" placeholder="School" name="school" id='school' required />
                <label htmlFor="school" className="form__label">School</label>
            </div>
            <div className="form__group field">
                <input value={degree} onChange={(e) => setDegree(e.target.value)} type="input" className="form__field" placeholder="Degree" name="degree" id='degree' required />
                <label htmlFor="Degree" className="form__label">Degree</label>
            </div>
            <div className="form__group field">
                <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="month" className="form__field" placeholder="startDate" name="startDate" id='startDate' required />
                <label htmlFor="startDate" className="form__label">Start Date</label>
            </div>
            <div className="form__group field">
                <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="month" className="form__field" placeholder="endDate" name="endDate" id='endDate' required />
                <label htmlFor="endDate" className="form__label">End Date</label>
            </div>
            <div>
                <button onClick={() => handleUpdate()}>Save</button>
            </div>
        </div>
    )
}