import { useRef } from "react";

//{ props }: { props: any }
export default function ProfileInPDF({ props }: { props: any }) {
    console.log(props);
    
    const containerStyle: any = {
        padding: '30px'
    }

    const hrStyle: any = {
        paddingTop: '10px',
        paddingBottom: '10px',
    }

    return (
        <div style={containerStyle}>
            <h2>{props.name}</h2>
            {/* <small>Location</small> */}
            <div style={hrStyle}>
                <hr />
            </div>
            <h3>Education</h3>
            {/*  */}
            <p>School Name</p>
            <small>Year - Year</small>
            {/*  */}
            <div style={hrStyle}>
                <hr />
            </div>
            <h3>Experience</h3>
            {/*  */}
            <p>Company Name</p>
            <p>Staff</p>
            <small>Year - Year</small>
            {/*  */}
            <div style={hrStyle}>
                <hr />
            </div>
            <h3>Contact</h3>
            <p>Email</p>
            <p>LinHEdIn link</p>
        </div>
    )

}