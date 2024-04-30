import React, { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import { Link, useParams } from "react-router-dom";
import '../components/CSS/TourDetails.css'
import "../components/CSS/AllTours.css";
import { useGetTourPlacesQuery } from "../Slices/agentApiSlice";
import Loader from "../components/Loader/Loader";
const TourDetails = () => {
    const [places, setPlaces] = useState([]);
    const { id } = useParams();
    const { data: placeData, isLoading } = useGetTourPlacesQuery(id);



    useEffect(() => {
        if (placeData) {
            setPlaces(placeData.places);
        }

    }, [placeData]);

    if (isLoading) {
        return <Loader />;
    }


    return (
        <>
            <Navbar />
            <div>
                <h1>Tour Place Details</h1>
            </div>
            <hr />

            {places.map((place) => (
                <div key={place._id} className="place-item-container" id={`place-item-${place._id}`}>
                    <div className="place-image-container">
                        <img
                            className="place-image"
                            src={`http://localhost:4000/${place.Imageurl.replace(/\\/g, '/').replace('backend/', '')}`}
                            alt={"Place"}
                        />

                    </div>
                    <div className="place-text">
                        <h2 className="place-title">{place.name}</h2>
                        <p className="place-description" name="description" style={{ fontSize: '15px' }}>
                            {place.description}
                        </p>
                    </div>



                </div>

            ))}
            <Footer />
        </>
    );
};

export default TourDetails;