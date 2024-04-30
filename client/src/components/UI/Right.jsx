import React from "react";
import "../CSS/Right.css";

const Right = () => {
  return (
    <div className="right">
      <h2>Contact Info</h2>
      <div className="all-icons">
        {[
          {
            src: "/place.png",
            alt: "Location",
            text: "Indian Institute Of Information Technology, Sricity",
            marginLeft: "2rem"
            
          },
          {
            src: "/telephone.png",
            alt: "Telephone",
            text: "9191919928",
            marginLeft: "2rem"
          },
          {
            src: "/email.png",
            alt: "Email",
            text: "Vihari@iiits.in",
            marginLeft: "2rem"
          },
          {
            src: "/facebook.png",
            alt: "Facebook",
            text: "Facebook",
            marginLeft: "2rem"
          },
          {
            src: "/LinkedIn.png",
            alt: "LinkedIn",
            text: "LinkedIn",
            marginLeft: "2rem"
          },
          {
            src: "/Twitter.png",
            alt: "Twitter",
            text: "Twitter",
            marginLeft: "2rem"
          }
        ].map((icon, index) => (
          <div className="icons" key={index}>
            <div className="icon-container" style={{ textAlign: "centre" }}>
              <img src={icon.src} alt={icon.alt} style={{ height: "1rem" }} />
            </div>
            <p style={{  marginLeft: icon.marginLeft, marginBottom: "0.75rem" }}>
              {icon.text}
            </p>
          </div>
        ))}
      </div>
      <div>
        <img src = "/contact.png" alt = "contact" className = "contact-image"/>
      </div>
    </div>
  );
};

export default Right;