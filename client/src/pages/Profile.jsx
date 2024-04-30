import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import profileImage from "../Assets/profile.png";
import myProfile from "../Assets/myProfile.png";
import myTrips from "../Assets/busTrips.png";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import { useNavigate } from "react-router-dom";
import "../components/CSS/userProfile.css";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const [bushistory, setBusHistory] = useState(false);
  const [profile, setprofile] = useState(true);
  const [tourHistory, setTourHistory] = useState(false);
  const [bookings, setbookings] = useState([]);
  const [buses, setbuses] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const getDetails = async () => {
    const response = await fetch("http://localhost:4000/userdetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setuser(json.user);
  };
  const getTrips = async () => {
    const response = await fetch("http://localhost:4000/history", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setbookings(data.tickets);

    data.tickets.forEach(async (booking) => {
      const bus = await getBusDetails(booking.bus);
      setbuses((prevBuses) => [...prevBuses, bus]);
    });
  };

  const profileSet = () => {
    setBusHistory(false);
    setTourHistory(false);
    setprofile(true);
  };
  const setTrip = () => {
    setprofile(false);
    setTourHistory(false);
    setBusHistory(true);
  };
  const setTour = () => {
    setprofile(false);
    setBusHistory(false);
    setTourHistory(true);
  };
  useEffect(() => {
    getDetails();
    getTrips();
    getTourBookings();
  }, []);
  const handleEditInProfile = (e) => {
    e.preventDefault();
    navigate("/profile/editUserProfile");
  };
  const getBusDetails = async (id) => {
    const response = await fetch("http://localhost:4000/busdetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    return json.bus;
  };

  //  Function to get all tour bookings
  const getTourBookings = async () => {
    const response = await fetch("http://localhost:4000/tourbookings", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    let tours = [];
    json.tickets.forEach(async (ticket) => {
      const res = await fetch("http://localhost:4000/api/tour/gettour", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: ticket.tour }),
      });
      const data = await res.json();
      tours.push({tour:data.tour,seats:ticket.tickets,price:ticket.price});
    });
    console.log(tours)
    setTourBookings(tours);
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="leftdiv">
          <div style={{ marginBottom: "4rem" }} className="profile-items">
            <img className="profile-icons" src={profileImage} alt="profile" />
            <h2>{user.firstName + " " + user.lastName}</h2>
          </div>
          <div className="profile-items">
            <img className="profile-icons" src={myProfile} alt="MyProfile" />
            <button
              id="profile"
              onClick={() => {
                profileSet();
              }}
              style={{ background: "inherit" }}
            >
              <h2>My profile</h2>
            </button>
          </div>
          <hr />
          <div className="profile-items">
            <img className="profile-icons" src={myTrips} alt="trips" />
            <button
              id="history"
              onClick={() => {
                setTrip();
              }}
              style={{ background: "inherit" }}
            >
              <h2>My trips</h2>
            </button>
          </div>
          <hr />
          <div className="profile-items">
            <img className="profile-icons" src={myTrips} alt="trips" />
            <button
              id="history"
              onClick={() => {
                setTour();
              }}
              style={{ background: "inherit" }}
            >
              <h2>My tours</h2>
            </button>
          </div>
          <hr />
        </div>

        <div className="rightdiv">
          <h1>My Profile</h1>
          {profile && (
            <div className="profile-details">
              <div className="nameAndGender">
                <div>
                  <h2>Name</h2>
                  <h3>{user.firstName + " " + user.lastName}</h3>
                </div>
                {/* <div>
              <h2>Gender</h2>
              <h3>Male</h3>
            </div> */}
                {/* <div className="dob">
            <h2>Date of Birth</h2>
            <h3>27-08-2003</h3>
          </div> */}
              </div>
              <div className="contact-info">
                <hr />
                <h1>My Contact Information</h1>

                <div className="nameAndGender">
                  <div>
                    <h2>Email</h2>
                    <h3>{user.email}</h3>
                  </div>
                  <div>
                    <h2>Mobile Number</h2>
                    <h3>{user.mobile}</h3>
                  </div>
                </div>

                {/* <button type="submit" onClick={handleEditInProfile}>
              Edit Info{" "}
            </button> */}
              </div>
            </div>
          )}
          {bushistory && (
            <div className="profile-details">
              {bookings.length === 0 ? (
                <div
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "15px",
                  }}
                >
                  <img src="sweat.gif" alt="" style={{ height: "70px" }} />
                  <h1>No Bookings yet</h1>
                </div>
              ) : (
                <table
                  className="table"
                  style={{ fontSize: "20px", padding: "10px" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Source</th>
                      <th scope="col">Destination</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Seats</th>
                      <th scope="col">Fare</th>
                      <th scope="col">Booking Date</th>
                      {/* <th scope="col">Cancel</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking, index) => {
                      return (
                        <>
                          <tr>
                            {/* <td><img src={buses[index].Imageurl?.replace(/^.*backend\\/i, "")} alt=""  style={{height:'60px'}}/></td> */}
                            <td>{buses[index].srcname}</td>
                            <td>{buses[index].destname}</td>
                            <td>{buses[index].tktprice}</td>
                            <td>{booking.tickets.length}</td>
                            <td>
                              {booking.tickets.length * buses[index].tktprice}
                            </td>
                            <td>{booking.date}</td>
                            {/* <td><button className="btn btn-primary cancel-ticket" style={{fontSize:'15px'}}>cancel</button></td> */}
                          </tr>
                          <hr />
                        </>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {tourHistory && (
            <div className="profile-details">
              {tourBookings.length === 0 ? (
                <div
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "15px",
                  }}
                >
                  <img src="sweat.gif" alt="" style={{ height: "70px" }} />
                  <h1>No Bookings yet</h1>
                </div>
              ) : (
                <table
                className="table"
                style={{ fontSize: "20px", padding: "10px" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Package</th>
                      <th scope="col">Price</th>
                      <th scope="col">Booked</th>
                      <th scope="col">Total price</th>
                    </tr>
                  </thead>
                  <hr />
                  <tbody>
                    {tourBookings.map((tour)=>{
                       return (
                        <>
                          <tr>
                            {/* <td><img src={buses[index].Imageurl?.replace(/^.*backend\\/i, "")} alt=""  style={{height:'60px'}}/></td> */}
                            <td>{tour.tour.tname}</td>
                            <td>{tour.tour.tprice}</td>
                            <td>{tour.seats}</td>
                            <td>{tour.seats * tour.tour.tprice}</td>
                          </tr>
                          <hr />
                        </>
                      ); 
                    })}

                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
