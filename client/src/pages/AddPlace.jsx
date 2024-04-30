import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/UI/AgentNavbar";
import { useAddPlaceDetailsMutation } from "../Slices/agentApiSlice";

const AddPlace = () => {
  const { id } = useParams();
  const [addPlace]=useAddPlaceDetailsMutation();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    placeImage: "",

  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==="placeImage"){
      setFormData({
        ...formData,
        [name]:e.target.files[0]
      })
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
      const form_data=new FormData();
      form_data.append("title",formData.title);
      form_data.append("description",formData.description);
      form_data.append("placeImage",formData.placeImage);
  
      await addPlace({tourId:id,data:form_data});
      alert("Place added successfully");
      navigate(`/agent/opentour/${id}`);
    } catch(error){
      console.log("Failed to add place",error); 
    }
    

  };

  return (
    <div><AdminNavbar />
      <div className="add-tour" style={{ backgroundColor: 'white' }}>
        <div className="main">
          <div className="container addtour" style={{ fontSize: '15px', color: 'black', backgroundColor: 'blue' }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row ">
                <div className="">
                  <h1 style={{ color: 'white', marginTop: '50px', fontSize: '30px' }}>Add Place</h1>
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
                            name="title"
                            placeholder="Place Name"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.title}
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
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control inputs"
                            id="lname"
                            name="description"
                            placeholder="Description"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.description}
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
                            id="pimage"
                            name="placeImage"
                            placeholder="Place Image"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            
                          />
                          <span
                            className="invalid-form"
                            id="invalid-pimage"
                          ></span>

                        </div>
                      </div>
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="ADD PLACE"
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

export default AddPlace;