import React, { useState, useEffect } from "react";
import { useGetAgentBusesQuery, useGetAgentToursQuery } from "../../Slices/agentApiSlice";
import { FaUser } from 'react-icons/fa';
import '../CSS/AdminHeader.css';
import Thome from '../../Assets/Thome.jpg'
const AdminHeader = () => {
  const [numBuses, setNumBuses] = useState(0);
  const [numTours, setNumTours] = useState(0);

  const agentId = localStorage.getItem('agentId');
  const { data: busData } = useGetAgentBusesQuery(agentId);
  const { data: tourData } = useGetAgentToursQuery(agentId);

  useEffect(() => {
    if (busData && busData.buses) {
      setNumBuses(busData.buses.length);
    }
    if (tourData && tourData.tours) {
      setNumTours(tourData.tours.length);
    }
  }, [busData, tourData]);

  return (
    <header className="header-container">
       <div className="header-image">
          <img
            className="header-image-overlay"
            src={Thome}
            alt="Admin's home"
          />
        </div>
      <div className="header-content">
        <h1 className="header-title">Agent's Home Page</h1>
        <div className="header-description">
          <p>This is a place for Agents to access resources, manage buses, manage tours.</p>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-box">
          <FaUser className="user-icon" />
          <h2>Total Agent Buses:</h2>
          <p style={{ color: '#007bff' }}>{numBuses}</p>
        </div>
        <div className="dashboard-box">
          <FaUser className="user-icon" />
          <h2>Total Agent Tours:</h2>
          <p style={{ color: '#007bff' }}>{numTours}</p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
