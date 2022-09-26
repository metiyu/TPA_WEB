import { useState } from 'react'
import './Modal.css'

export default function ExperienceModal(
    {   
        id,
        title,
        setTitle,
        employmentType,
        setEmploymentType,
        companyName,
        setCompanyName,
        location,
        setLocation,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        type,
        add,
        edit
    }:
        {
            id: any,
            title: any,
            setTitle: any,
            employmentType: any,
            setEmploymentType: any,
            companyName: any,
            setCompanyName: any,
            location: any,
            setLocation: any,
            startDate: any,
            setStartDate: any,
            endDate: any,
            setEndDate: any,
            type: any,
            add: any,
            edit: any
        }
) {

    function handleUpdate() {
        console.log(type);
        if (type == "add")
            add()
        else if (type == "edit")
            edit({
                id,
                title,
                employmentType,
                companyName,
                location,
                startDate,
                endDate
            })
    }

    return (
        <div className="modal__container">
            <div className='modal__title'>
                <span>Education</span>
            </div>
            <div className="form__group field">
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="input" className="form__field" placeholder="Title" name="title" id='title' required />
                <label htmlFor="title" className="form__label">Title</label>
            </div>
            <div className="form__group field">
                <input value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} type="input" className="form__field" placeholder="Employment Type" name="employmentType" id='employmentType' required />
                <label htmlFor="employmentType" className="form__label">Employment Type</label>
            </div>
            <div className="form__group field">
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="input" className="form__field" placeholder="Company Name" name="companyName" id='companyName' required />
                <label htmlFor="companyName" className="form__label">Company Name</label>
            </div>
            <div className="form__group field">
                <input value={location} onChange={(e) => setLocation(e.target.value)} type="input" className="form__field" placeholder="Location" name="location" id='location' required />
                <label htmlFor="location" className="form__label">Location</label>
            </div>
            <div className="form__group field">
                <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="month" className="form__field" placeholder="startDate" name="startDate" id='startDate' required />
                <label htmlFor="startDate" className="form__label">Start Date</label>
            </div>
            <div className="form__group field">
                <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="month" className="form__field" placeholder="endDate" name="endDate" id='endDate' />
                <label htmlFor="endDate" className="form__label">End Date</label>
            </div>
            <div>
                <button onClick={() => handleUpdate()}>Save</button>
            </div>
        </div>
    )
}