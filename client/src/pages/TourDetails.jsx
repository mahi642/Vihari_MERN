import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/UI/AgentNavbar";
import { Link, useParams } from "react-router-dom";
import '../components/CSS/TourDetails.css'
import "../components/CSS/AllTours.css";
import { useGetTourPlacesQuery, useDeletePlaceMutation } from "../Slices/agentApiSlice";
import Loader from "../components/Loader/Loader";
const TourDetails = () => {
  const [places, setPlaces] = useState([]);
  const { id } = useParams();
  const { data: placeData, isLoading, refetch } = useGetTourPlacesQuery(id);
  const [deletePlace] = useDeletePlaceMutation();



  useEffect(() => {
    if (placeData) {
      setPlaces(placeData.places);
    }

  }, [placeData]);

  if (isLoading) {
    return <Loader />;
  }

  const handleDeletePlace = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Place?');

    try {
      if (confirmDelete) {

        await deletePlace(id);
        alert("Place deleted succesfully");
        refetch();
      }


    } catch (error) {
      console.log("Failed to delete place", error);
    }

  }

  return (
    <>
      <AdminNavbar />
      <div>
        <h1>Tour Place Details</h1>
      </div>
      <Link to={`/agent/addplace/${id}`}>
        <button className="addnew btn btn-success" style={{ fontSize: '15px' }} type="button">
          <i className="fa fa-user-plus"></i>&nbsp; Add New Place
        </button>
      </Link>
      <hr />

      {places.map((place) => (
        <div key={place._id} className="place-item-container" id={`place-item-${place._id}`}>
          <div className="place-image-container">
            <img
              className="place-image"
              src={place.Imageurl ? `http://localhost:4000/${place.Imageurl.replace(/\\/g, '/').replace('backend/', '')}` : ''}
              alt={"Place"}
            />


          </div>
          <div className="place-text">
            <h2 className="place-title">{place.name}</h2>
            <p className="place-description" name="description" style={{ fontSize: '15px' }}>
              {place.description}
            </p>
          </div>

          <div className="col-md-1">
            <div>
              <button
                type="button"
                className="delete-user-btn btn btn-danger" style={{ fontSize: '15px' }}
                data-place-id={place._id}
                onClick={() => handleDeletePlace(place._id)}
              >
                Delete
              </button>
            </div>
          </div>


        </div>

      ))}
    </>
  );
};

export default TourDetails;