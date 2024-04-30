import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import profileImage from "../Assets/profile.png";
import myProfile from "../Assets/myProfile.png";
import myTrips from "../Assets/busTrips.png";
import Navbar from "../components/UI/Navbar";
import { useNavigate } from "react-router-dom";
import { useEditUserDetailsMutation } from "../Slices/adminApiSlice";
import "../components/CSS/EditProfile.css";
const EditProfile = () => {
  const navigate = useNavigate();
  const [editUserDetails] = useEditUserDetailsMutation();

  const [userfirstName,setuserfirstName] = useState('');
  const [userlastName,setuserlastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const handleSave = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const { data } = await editUserDetails({ userId, data: { userfirstName, userlastName, email, mobile } });
      alert("Profile Updated succesfully"); 
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      console.error("Error editing user details:", error);
     
    }
  };
  const handleCancel = (e) => {
    navigate("/profile");
  };

  return (
    <div>
      <Navbar />
      <div className="profile">
        {/* <div className="leftdiv">
          <div style={{ marginBottom: "4rem" }} className="profile-items">
            <img className="profile-icons" src={profileImage} alt="profile" />
            <h1>User Name</h1>
          </div>
          <div className="profile-items">
            <img className="profile-icons" src={myProfile} alt="MyProfile" />
            <h1>My profile</h1>
          </div>
          <hr />
          <div className="profile-items">
            <img className="profile-icons" src={myTrips} alt="trips" />
            <h1>My trips</h1>
          </div>
          <hr />
        </div> */}

        <div className="rightdiv-agent">
          <h1>Edit Profile</h1>

          <div className="profile-details-agent">
          <div>
              <h2 style={{marginTop:'20px'}}>First Name</h2>
              <input
                className="inp-name"
                type="text"
                placeholder="First Name"
                value={userfirstName}
                onChange={(e) => setuserfirstName(e.target.value)}
              />
            </div>
            <div>
              <h2 style={{marginTop:'20px'}}>Last Name</h2>
              <input
                className="inp-name"
                type="text"
                placeholder="Last Name"
                value={userlastName}
                onChange={(e) => setuserlastName(e.target.value)}
              />
            </div>
            <div>
              <h2 style={{marginTop:'20px'}}>Email</h2>
              <input
                className="inp-name"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <h2 style={{marginTop:'20px'}}>Mobile Number</h2>
              <input
                className="inp-name"
                type="number"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
              <div className="cancel-save" style={{marginTop:'40px'}}>
                <button type="submit" onClick={handleCancel}>
                  CANCEL
                </button>
                <button type="submit" onClick={handleSave}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditProfile;
