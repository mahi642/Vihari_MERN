import React from "react";
import "../CSS/Profile.css";

const Profile = (props) => {
  return (
    <div className="Profile ">
      <div className="profile-image ">
        <img src={props.image} alt='' />
      </div>
      <div className="profile-content">
        <h1>{props.ProfileName}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          debitis nobis vero at unde! Tempore consequuntur, architecto deserunt
          quos, dolor ullam error quaerat voluptate officia magnam blanditiis!
          Perferendis, explicabo rem?
        </p>
      </div>
    </div>
  );
};
export default Profile;