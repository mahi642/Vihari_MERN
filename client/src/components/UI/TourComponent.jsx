import React from 'react';
import '../CSS/TourComponent.css';
import { Link } from 'react-router-dom';

const TourComponent = ({ image, name, price, duration, accommodation, transportation, reviews, link }) => {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="single-package-item">
        <img src={image} alt="package-place" />
        <div className="single-package-item-txt">
          <h3 style={{ color: '#3995a3' }}>{name} <span className="pull-right">₹{price}</span></h3>
          <div className="packages-para">
            <p>
              <i className="fa fa-angle-right"></i> {duration}
            </p>
            <p><
              i className="fa fa-angle-right"></i> {accommodation}
            </p>
            <p>
              <i className="fa fa-angle-right"></i> {transportation}
            </p>
            <p>
              <i className="fa fa-angle-right"></i> {reviews} reviews
            </p>
          </div>
          <div className="about-btn">
            <Link to="/tours" style={{ textDecoration: "none" }}><button className="about-view packages-btn" >book now</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourComponent;