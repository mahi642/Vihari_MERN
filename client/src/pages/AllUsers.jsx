import React, { useState, useEffect } from 'react';
import UserAvatar from '../Assets/User_avatar.jpg'
import { Link } from 'react-router-dom';
import AdminNavbar1 from "../components/UI/AdminNavbar";
import { useGetAllUsersQuery} from "../Slices/adminApiSlice";
import Loader from '../components/Loader/Loader';
import { useDeleteUserMutation } from '../Slices/adminApiSlice';
const AllUsers = () => {    
  const [Users, setAllUsers] = useState([]);

  const {data:UserData,isLoading,refetch}=useGetAllUsersQuery();

  const [deleteUser]=useDeleteUserMutation();

  useEffect(()=>{
    if(UserData){
      setAllUsers(UserData.users);
    }
  },[UserData]);

 
  const handleDeleteUser = async (userId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this user?');
      if (!confirmed) {
        return; 
      }
      await deleteUser(userId).unwrap();
      alert("User deleted successfully");
      await refetch();
    } catch (error) {

      console.error("Error deleting user:", error);
    }
  };

  if (isLoading) return <Loader />;
  return (

    <div>
      <AdminNavbar1 />
      
      <div>
        <h1>User Details</h1>
      </div>
      <Link to="/admindb/adduser">
        <button className="addnew btn btn-success" style={{ fontSize: '15px' }} type="button">
          <i className="fa fa-user-plus" ></i>&nbsp; Add New User
        </button>
      </Link>
      <hr />
      {Users.length === 0 && (<h1>No Users Found</h1>)}
      {Users.map((user, index) => (
        <div className="row col-md-12 justify-content-center" key={user._id}>
          <div className="col-md-1"></div>
          <div className="col-md-10" id={`user-item-${user._id}`}>
            <div className="item-container">
              <div className="item-image col-md-3">
                <img
                  className="img-thumbnail item-image"
                  src={UserAvatar}
                  style={{ width: '200px' }}
                  alt="Cannot display"
                />
              </div>
              <div className="item-content col-md-6 userdetails">
                <div>
                  <h3>User {index + 1}</h3>
                </div>
                <div>
                  <p>Firstname: {user.firstName}</p>
                </div>
                <div>
                  <p>Lastname: {user.lastName}</p>
                </div>
                <div>
                  <p>Email: {user.email}</p>
                </div>

              </div>
              <div className="col-md-1">
                <div>
                  <button
                    type="button"
                    className="delete-user-btn btn btn-danger" style={{ fontSize: '15px' }}
                    data-user-id={user.id}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div>
              <hr />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;