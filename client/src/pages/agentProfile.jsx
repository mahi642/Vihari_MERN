import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import profileImage from "../Assets/profile.png";
import myProfile from "../Assets/myProfile.png";
import { useNavigate } from "react-router-dom";
import "../components/CSS/agentProfile.css";
import AgentNavbar from "../components/UI/AgentNavbar";
import { useGetAgentProfileQuery } from "../Slices/agentApiSlice";
import Loader from '../components/Loader/Loader'

const AgentProfile = () => {
  const navigate = useNavigate();
  const [agent, setAgent] = useState({});
  const agentId=localStorage.getItem('agentId');
  const {data:agentData,isLoading}=useGetAgentProfileQuery(agentId);
  useEffect(()=>{
    if(agentData){
        setAgent(agentData.agent);
    }
  },[agentData])
  const handleEditInProfile = (e) => {
    e.preventDefault();
    navigate("/agent/editAgentProfile");
  };

  if(isLoading){
    return <Loader/>
  }
  return (
    <div>
      <AgentNavbar />
      <div className="profile-agent">

        <div className="rightdiv-agent">
          <h1>My Profile</h1>

          <div className="profile-details-agent">
            <div className="nameAndGender-agent">
              <div>
                <h1>Agency Name</h1>
                <h3 style={{textAlign:'center'}}>{agent.agentName}</h3>
              </div>
            </div>
            <div className="contact-info-agent">
              <h1>My Contact Information</h1>

              <div className="nameAndGender-agent">
                <div>
                  <h3>{agent.email}</h3>
                </div>
              </div>

              <button type="submit" onClick={handleEditInProfile}>
                Edit Info{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
