import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/UI/AgentNavbar";
import { useAddTourDetailsMutation } from "../Slices/agentApiSlice";

const AddTour = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tourName: "",
    tourPrice: 0,
    imageFile: "",
    places: []

  });

  const [addTour]=useAddTourDetailsMutation();

  const agentId=localStorage.getItem("agentId");



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==="tourImage"){
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });

    } else{

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    try{

      e.preventDefault();
      const form_data = new FormData();
      form_data.append("tname",formData.tourName);
      form_data.append("tprice",formData.tourPrice);
      form_data.append("tourImage",formData.tourImage);
      form_data.append("places",[]);
      form_data.append("agentId",agentId);

  
      await addTour(form_data);
      alert("Tour added successfully");
      navigate('/agent/alltours');
      window.location.reload();
      
      console.log("Form data submitted:", formData);
    } catch(error){
      console.log("Failed to submit form data");
    }

  };

  return (
    <div><AdminNavbar />
      <div className="add-tour" style={{ backgroundColor: 'white' }}>
        <div className="main ">
          <div className="container addtour" style={{ fontSize: '15px', color: 'black', backgroundColor: 'blue' }}>
            <form onSubmit={handleSubmit}>
              <div className="row ">
                <div className="">
                  <h1 style={{ color: 'white', marginTop: '50px', fontSize: '30px' }}>Add Tour</h1>
                  <div className="row login-row" style={{ marginTop: '170px', display: 'flex', flexDirection: 'column', marginLeft: '100px', width: '450px' }}>
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control inputs"
                            id="f-name"
                            name="tourName"
                            placeholder="Tour Name"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.tourName}
                          />
                          <span
                            className="invalid-form"
                            id="invalid-fname"
                          ></span>

                        </div>
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i class="fa fa-inr" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control inputs"
                            id="lname"
                            name="tourPrice"
                            placeholder="Tour Price"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.tourPrice}
                          />
                          <span
                            className="invalid-form"
                            id="invalid-lname"
                          ></span>

                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i class="fa fa-inr" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control inputs"
                            id="timage"
                            name="tourImage"
                            placeholder="Tour Image"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            
                          />
                          <span
                            className="invalid-form"
                            id="invalid-timage"
                          ></span>

                        </div>
                      </div>
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="ADD TOUR"
                    className="btn btn-primary btn-submit-login" style={{ fontSize: '15px' }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTour;