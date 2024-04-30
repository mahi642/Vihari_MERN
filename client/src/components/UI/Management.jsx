import React from "react";
import "../CSS/Management.css";
import Profile from "./Profile";

const Management = () => {
    return (
        <div className="Management">
            <h1>Management Team</h1>
            <Profile ProfileName="Shreyan" image='../User_avatar.jpg' />
            <Profile ProfileName="Srikar" image='../User_avatar.jpg' />
            <Profile ProfileName="Nithin" image='../User_avatar.jpg' />
            <Profile ProfileName="Mahesh" image='../User_avatar.jpg' />
            <Profile ProfileName="Prasanna" image='../User_avatar.jpg' />
        </div>
    )
}
export default Management;