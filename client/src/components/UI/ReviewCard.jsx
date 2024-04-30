// ReviewCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Reviews.css'
const ReviewCard = ({ image, matter, name, region }) => {
  return (
    <div className="card swiper-slide inner-card">
      <div className="home1-testm item">
        <div className="home1-testm-single text-center">
          <div className="home1-testm-img">
            <img src={image} alt="img" />
          </div>
          <div className="home1-testm-txt">
            <span className="icon section-icon">
              <i className="fa fa-quote-left" aria-hidden="true"></i>
            </span>
            <p style={{ marginLeft: '1%', marginRight: '1%' }}>
              {matter}
            </p>
            <h3>
              <Link to="" style={{ marginLeft: '5%',textDecoration:"none" }}>
                {name}
              </Link>
            </h3>
            <h4 style={{ marginLeft: '5%',textAlign:'revert-layer' }}>{region}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;