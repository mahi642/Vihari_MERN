import React, { useState, useEffect } from "react";
import '../CSS/AdminHeader.css';
import { useGetAllUsersQuery, useGetAllAgentsQuery } from "../../Slices/adminApiSlice";
import { useGetAllBusesQuery } from "../../Slices/agentApiSlice";
import { FaUser } from 'react-icons/fa';
import Ahome from '../../Assets/Admin.jpg'
const Header = () => {
  const [numUsers, setNumUsers] = useState(0);
  const [numAgents, setNumAgents] = useState(0);
  const [numBuses,setNumBuses] = useState(0);
  const { data: userData } = useGetAllUsersQuery();
  const { data: agentData } = useGetAllAgentsQuery();
  const { data: busData } = useGetAllBusesQuery();
  useEffect(() => {
    if (userData && userData.users) {
      setNumUsers(userData.users.length);
    }
    if (busData && busData.buses) {
      setNumBuses(busData.buses.length);
    }
    if (agentData && agentData.agents) {
      const agentsWithFlag1 = agentData.agents.filter(agent => agent.flag === 1);
      setNumAgents(agentsWithFlag1.length);
    }
    
  }, [userData, agentData,busData]);

  return (
    <>
      <header className="header-container">
        <div className="header-image">
          <img
            className="header-image-overlay"
            src={Ahome}
            alt="Admin's home"
          />
        </div>
        <div className="header-content">
          <h1 className="header-title">Admin's Home Page</h1>
          <p className="header-welcome">Welcome, Admin</p>
          <div className="header-description">
            <p>
              This is a place for Admin to control users,Manage agents and send announcements
            </p>
          </div>
        </div>
        
        <div className="dashboard-container">
          <div className="dashboard-box">
            <FaUser className="user-icon" /> 
            <h2>Total Users:</h2>
            <p style={{ color: '#007bff' }}>{numUsers}</p> 
          </div>
          <div className="dashboard-box">
            <FaUser className="user-icon" /> 
            <h2>Total Buses:</h2>
            <p style={{ color: '#007bff' }}>{numBuses}</p> 
          </div>
          <div className="dashboard-box">
          <FaUser className="user-icon" /> 
            <h2>Total Agents:</h2>
            <p style={{ color: '#007bff' }}>{numAgents}</p> 
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
