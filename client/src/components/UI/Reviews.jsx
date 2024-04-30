// ReviewsSection.jsx
import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import ReviewCard from './ReviewCard';
import '../CSS/Reviews.css'
const ReviewsSection = () => {
    const swiperRef = useRef(null);
    useEffect(() => {
        swiperRef.current  = new Swiper('.slide-content', {
          grabCursor: true,
          mousewheel: true,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            600: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          },
        });
    
        // Clean up Swiper instance on component unmount
        return () => {
            if(swiperRef.current){
          swiperRef.current.destroy();
            }
        };
      }, []); // Empty dependency array means this effect will only run once after initial render
    

  // Sample data for reviews
  const reviewsData = [
    {
      image: '../User_avatar.jpg',
      matter: 'User-friendly platform, vast network, and great discounts. Real-time tracking adds convenience.',
      name: 'Ramesh',
      region: 'India',
    },
    {
        image: '../User_avatar.jpg',
        matter: 'Effortless bookings, diverse options, and top-notch customer service. Vihari is my travel companion!',
        name: 'Suresh',
        region: 'India',
      },
      {
        image: '../User_avatar.jpg',
        matter: 'Reliable and secure payments. Real-time tracking is a game-changer. Highly recommended for stress-free journeys.',
        name: 'Ravi',
        region: 'India',
      },
      {
        image: '../User_avatar.jpg',
        matter: 'Simple interface, diverse routes, and prompt customer support. Solid choice for tours',
        name: 'Surya',
        region: 'India',
      },
      {
        image: '../User_avatar.jpg',
        matter: 'Vihari never disappoints. Secure payments, wide range of operators, and cool discounts. A must for bus bookings!',
        name: 'Raju',
        region: 'India',
      },
    // Add more review data as needed
  ];

  return (
    <section id="reviews" className="reviews">
      <div className="mb-7 text-center">
        <h2 className="services-header">Reviews</h2>
      </div>
      <div className="slide-container swiper" >
        <div className="slide-content" >
          <div className="swiper-wrapper">
            {reviewsData.map((review, index) => (
              <ReviewCard
                key={index}
                image={review.image}
                matter={review.matter}
                name={review.name}
                region={review.region}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;