import React from 'react';
import '../CSS/Services.css';

const Services = () => {
  return (
    <section id="services">
      <div className="container">
        <div className="mb-7 text-center">
          <h2 className="services-header">Services</h2>
        </div>
        <div className="row services-row">
          <ServiceCard
            iconClass="fa fa-bus"
            title="Fastest Travel"
            description="Travel makes one modest, you see what a tiny place you occupy in the world. So just travel without any regrets."
          />
          <ServiceCard
            iconClass="fa fa-cog"
            title="Customization"
            description="We deliver best-sourced bus services for customers."
          />
          <ServiceCard
            iconClass="fas fa-bullhorn"
            title="Safety Guide"
            description="At the end of the day, the goals are safety and security. We go to great lengths in order to ensure the safety of our tourists."
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ iconClass, title, description }) => {
  return (
    <div className="col-lg-4 col-sm-4 mb-6 services-cards">
      <div className="card service-card shadow-hover rounded-3 text-center align-items-center" >
        <i className={iconClass}></i>
        <h4 className="mb-3">{title}</h4>
        <p className="mb-0 fw-medium" style={{marginLeft:'20px'}}>{description}</p>
      </div>
    </div>
  );
};

export default Services;