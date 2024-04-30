import React, { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar";
import { Link, useParams } from "react-router-dom";
import '../components/CSS/TourDetails.css'
import "../components/CSS/AllTours.css";
const BookTour = () => {
  const [places, setPlaces] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getPlaces = () => {
      fetch("http://localhost:8000/tours/" + id)
        .then((res) => {
          return res.json();
        })
        .then((tour) => {
          setPlaces(tour.places);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getPlaces();
  }, [id]);

  return (
    <>
      <Navbar />
      <div>
        <h1>Tour Places</h1>
      </div>
      {places.map((place) => (
        <div key={place.id} className="place-item-container" id={`place-item-${place.id}`}>
          <div className="place-image-container">
            <img
              className="place-image"
              src={`${place.imagePath}`}
              alt={"Place"}
            />
          </div>
          <div className="place-text">
            <h2 className="place-title">{place.title}</h2>
            <p className="place-description" name="description" style={{ fontSize: '15px' }}>
              {place.description}
            </p>
          </div>
        </div>

      ))}
    </>
  );
};

export default BookTour;