import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AgentNavbar from "../components/UI/AgentNavbar";
const GetUsersByTourId = () => {
  const [userDetails, setUserDetails] = useState([]);
  const { tourId } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/${tourId}/alldetails`
        );
        const data = await response.json();

        const userDetailsArray = await Promise.all(
          data.getDetails.map(async (details) => {
            const userResponse = await fetch(
              `http://localhost:4000/api/${details.user}/userdetails`
            );
            const userData = await userResponse.json();

            return {
              userId: details.user,
              userName: userData.user.firstName,
              userEmail: userData.user.email,
              userMobile: userData.user.mobile,
              date: details.date,
            };
          })
        );

        setUserDetails(userDetailsArray);
      } catch (error) {
        console.error("Error in getting ticket details:", error);
      }
    };

    fetchUserDetails();
  }, [tourId]);

  return (
    <div>
      <AgentNavbar />
      <h1 style={{ fontSize: "4rem", fontWeight: "bolder" }}>User Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date of Booking</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map(
            ({ userId, userName, userEmail, userMobile, date }) => (
              <tr key={userId} className="bus-row" style={{ height: "50px" }}>
                <td>{userName}</td>
                <td>{userEmail}</td>
                <td>{userMobile}</td>
                <td>{date}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetUsersByTourId;
