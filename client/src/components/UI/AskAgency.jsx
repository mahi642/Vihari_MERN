import React from "react";
import "../CSS/AskAgency.css";
import busAgency from "../../Assets/bus_agency.jpg";
import tripImage from "../../Assets/trip_img.svg";
import { useNavigate } from "react-router-dom";
const AskAgency = () => {
  const navigate = useNavigate();

  const handleAgency = (e) => {
    navigate("/agentSignUp");
  };

  return (
    <div className="AskAgency">
      <div className="busContainer">
        <img className="busImage" src={busAgency} alt="BusAgency" />
      </div>

      <div className="busContainer">
        {/* "Interested in expanding your agency's reach? Partner with us and
        showcase your buses and trip services to a wider audience! */}
        <h1>Add Your Agency</h1>

        <h2>
          "Interested in expanding your agency's reach? Partner with us and
          showcase your buses and trip services to a wider audience!{" "}
        </h2>
        <button className="AddAgency" onClick={handleAgency}>
          Add Agency
        </button>
      </div>
      <div className="busContainer">
        <img className="busImage2" src={tripImage} alt="BusAgency" />
      </div>
    </div>
  );
};

export default AskAgency;
