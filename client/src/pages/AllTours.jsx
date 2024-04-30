import React, { useState, useEffect } from "react";
import AgentNavbar from "../components/UI/AgentNavbar";
import { Link } from "react-router-dom";
import "../components/CSS/AllTours.css";
import { useGetAgentToursQuery,useDeleteTourMutation } from '../Slices/agentApiSlice'
import Loader from '../components/Loader/Loader';

const AllTours = () => {
  const [tours, setTours] = useState([]);
 

  const agentId=localStorage.getItem('agentId');

  const {data:agentTours,isLoading,refetch}=useGetAgentToursQuery(agentId);
  const [deleteTour]=useDeleteTourMutation();
  
  useEffect(() => {
    if (agentTours) {
      const updatedTours = agentTours.tours.map(tour => ({
        ...tour,
        DispImageurl: tour.DispImageurl.replace(/^backend\\/, '').replace(/\\/g, '/')
      }));
      console.log(updatedTours)
     
      setTours(updatedTours);
    }
  }, [agentTours]);
  const DeleteTour =async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tour?');

    if(confirmDelete){
      await deleteTour(id);
      alert('Bus deleted succesfully');
      refetch();
    }

    
  };
 

  if(isLoading){
    return <Loader/>;
  }

  return (
    <>
      <AgentNavbar />
      <div>
        <h1>Tour Details</h1>
      </div>
      <Link to="/agent/addtour">
        <button className="addnew btn btn-success" style={{ fontSize: '15px' }} type="button">
          <i className="fa fa-user-plus"></i>&nbsp; Add New Tour
        </button>
      </Link>
      <hr />

      <div id="pack" className="packages">
        <div className="container">
          <div className="packages-content">
            <div className="row">
              {tours.map((tour) => (
                <div className="col-md-4 col-sm-6" key={tour.id}>
                  <div className="single-package-item">
                    <div>
                      <img
                        style={{ height: "200px" }}
                        src={`http://localhost:4000/${tour.DispImageurl}`}
                        alt="package-place"
                      />
                    </div>
                    <div className="single-package-item-txt">
                      <h3>
                        <Link to={`/agent/opentour/${tour._id}`} style={{ textDecoration: "none", color: '#4e95a3' }}>
                          {tour.tname}
                        </Link>
                        <span className="pull-right" style={{ color: '#4e95a3' }} >
                          &nbsp; ₹{tour.tprice}
                        </span>
                      </h3>
                      <div className="packages-para">
                        <p>
                          <i className="fa fa-angle-right"></i> 5 star
                          accommodation
                        </p>
                        <p>
                          <span>
                            <i className="fa fa-angle-right"></i> transportation
                          </span>
                        </p>
                      </div>
                      <div className="packages-review">
                        <p>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </p>
                      </div>
                      <div className="about-btn" style={{ display: 'flex', margin: '20px' }}>
                        <Link to={`/agent/edittour/${tour._id}`} style={{ textDecoration: 'none' }}>
                          <button
                            style={{ backgroundColor: "#06bbcc" }}
                            className="about-view packages-btn"
                            data-toggle="modal"
                            data-target={`#my-${tour._id}`}
                          >
                            Edit tour
                          </button>
                        </Link>

                        <button
                          style={{ backgroundColor: "red", marginLeft: '60px', width: '150px' }}
                          className="about-view packages-btn"
                          data-toggle="modal"
                          data-target={`#my-${tour._id}`}
                          onClick={() => DeleteTour(tour._id)}
                        >
                          Delete tour
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTours;