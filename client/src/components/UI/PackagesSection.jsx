import React from 'react';
import TourComponent from './TourComponent';
import '../CSS/PackagesSection.css';

const PackagesSection = () => {
  const tours = [
    {
      name: 'Agra',
      image: '../agra.jpg',
      price: 499,
      duration: '3 Days 2 nights',
      accommodation: '5 star accommodation',
      transportation: 'Transportation',
      reviews: 254,
      link: '/tours',
    },
    {
      name: 'Hyderabad',
      image: '../hyderabad1.jpg',
      price: 1499,
      duration: '6 Days 7 nights',
      accommodation: '5 star accommodation',
      transportation: 'Transportation, Free food',
      reviews: 344,
      link: '/tours',
    },
    {
      name: 'Delhi',
      image: '../delhi1.jpg',
      price: 1199,
      duration: '5 Days 6 nights',
      accommodation: '5 star accommodation',
      transportation: 'Transportation, Food facilities',
      reviews: 544,
      link: '/tours',
    },
  ];

  return (
    <section id="pack" className="packages">
      <div className="container">
        <div className="gallary-header text-center">
          <h2>Special tours</h2>
          <p>Explore the Incredible India with our specialized packages.</p>
        </div>
        <div className="packages-content">
          <div className="row all-tours">
            {tours.map((tour, index) => (
              <TourComponent key={index} {...tour} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;