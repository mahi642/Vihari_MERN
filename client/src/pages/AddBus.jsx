import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/UI/AgentNavbar";
import { useAddBusDetailsMutation } from "../Slices/agentApiSlice";
const AddBus = () => {
  const navigate = useNavigate();
  const [addBus] = useAddBusDetailsMutation();
  const getUserId=()=>{
    const agentId=localStorage.getItem('agentId');
    return agentId;
  }
  const [formData, setFormData] = useState({
    srcname: "",
    destname: "",
    bname: "",
    deptime: "",
    arrtime: "",
    durtime: "",
    tktprice: "",
    btype: "",
    image: null,
    agentId:getUserId(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formDataToSend = new FormData();
      formDataToSend.append("srcname", formData.srcname);
      formDataToSend.append("destname", formData.destname);
      formDataToSend.append("bname", formData.bname);
      formDataToSend.append("deptime", formData.deptime);
      formDataToSend.append("arrtime", formData.arrtime);
      formDataToSend.append("durtime", formData.durtime);
      formDataToSend.append("tktprice", formData.tktprice);
      formDataToSend.append("btype", formData.btype);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("agentId", formData.agentId);


      await addBus(formDataToSend).unwrap();


      alert("Bus added successfully");
      navigate('/agent/allbuses');
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  return (
    <div><AdminNavbar />
      <div className="add-tour" style={{ backgroundColor: 'white' }}>
        <div className="main">
          <div className="container addtour" style={{ fontSize: '15px', color: 'black', backgroundColor: 'blue' }}>
            <form onSubmit={handleSubmit}>
              <div className="row ">
                <div className="">
                  <h1 style={{ color: 'white', marginTop: '30px', fontSize: '30px' }}>Add Bus</h1>
                  <div className="row login-row" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', marginLeft: '100px', width: '450px' }}>

                    {/* Source Name */}
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
                            name="srcname"
                            placeholder="Source Name"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.srcname}
                          />
                          <span
                            className="invalid-form"
                            id="invalid-fname"
                          ></span>

                        </div>
                      </div>
                    </div>

                    {/* Destination Name */}
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
                            name="destname"
                            placeholder="Destination name"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.destname}
                          />
                          <span
                            className="invalid-form"
                            id="invalid-lname"
                          ></span>

                        </div>
                      </div>
                    </div>

                    {/* Travels Name */}
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i className="fa fa-globe" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control inputs"
                            name="bname"
                            placeholder="Travels Name"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.bname}
                          />
                          <span className="invalid-form" id="invalid-email"></span>

                        </div>
                      </div>
                    </div>
                    {/* Departure Time */}
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i className="fa fa-clock-o" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control inputs"
                            name="deptime"
                            placeholder="Departure time"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.deptime}
                          />
                          <span className="invalid-form" id="invalid-email"></span>

                        </div>
                      </div>
                    </div>
                    {/* Arrival Time */}
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i className="fa fa-clock-o" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control inputs"
                            name="arrtime"
                            placeholder="Arrival Time"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.arrtime}
                          />
                          <span className="invalid-form" id="invalid-email"></span>

                        </div>
                      </div>
                    </div>
                    {/* Duration Time */}
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i className="fa fa-clock-o" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control inputs"
                            name="durtime"
                            placeholder="Duration Time"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.durtime}
                          />
                          <span className="invalid-form" id="invalid-email"></span>

                        </div>
                      </div>
                    </div>
                    {/* Ticket Price */}
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i class="fa fa-inr" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control inputs"
                            name="tktprice"
                            placeholder="Ticket price"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.tktprice}
                          />
                          <span className="invalid-form" id="invalid-email"></span>

                        </div>
                      </div>
                    </div>
                    {/* Bus Type */}
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i className="fa fa-bus" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control inputs"
                            name="btype"
                            placeholder="Ac or Non-Ac"
                            fdprocessedid="2myzgp"
                            onChange={handleInputChange}
                            value={formData.btype}
                          />
                          <span className="invalid-form" id="invalid-email"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-3 user">
                        <span className="input-group-text span">
                          <i className="fa fa-image" aria-hidden="true"></i>
                        </span>
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control inputs"
                            name="image"
                            onChange={handleImageChange}
                          />

                        </div>
                      </div>
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="ADD BUS"
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

export default AddBus;