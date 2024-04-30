import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/UI/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/UI/Footer";
import { useGetAllToursQuery } from '../Slices/agentApiSlice';
import "../components/CSS/AllTours.css";
import Loader from '../components/Loader/Loader';
import useRazorpay from "react-razorpay";
import busContext from "../context/bus/busContext";


const Tours = () => {
  const navigate = useNavigate()
  const [Razorpay] = useRazorpay()
  const {orderRazorpay} = useContext(busContext)
  const [tours, setAllTours] = useState([]);
  const { data: tourData, isLoading } = useGetAllToursQuery();
   const [showModal, setShowModal] = useState(false);
  const [commonData, setCommonData] = useState({
    email: '',
    mobile: '',
    seats: 0,
    price: 0
  });
 
  const handleCommonInputChange = (e) => {
    const { name, value } = e.target;
    setCommonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (tourData) {
      const updatedTourData = tourData.tours.map(tour => ({
        ...tour,
        DispImageurl: tour.DispImageurl.replace(/^backend\\/, '').replace(/\\/g, '/')
      }));
      setAllTours(updatedTourData);
    }
  }, [tourData]);
  const toggleModal = () => {
    const token = localStorage.getItem('token');
    setShowModal(token ? !showModal : false);
    if (!token) {
      alert('Please log in to book a tour.');
      navigate('/login');
    }
  };
  const changePrice = (e)=>{
   setCommonData({...commonData,price:e.target.value})
  }
  const HandlePayment = async(e,tour) => {
    e.preventDefault()
    console.log(commonData.seats)
   await setCommonData({...commonData,price:commonData.seats*tour.tprice})
      let price = commonData.seats*tour.tprice;
      console.log('Payment logic goes here');
     let order = await orderRazorpay(price)
     const options = {
      key: "rzp_test_lQaiC5AbagJXwZ", // Enter the Key ID generated from the Dashboard
      amount: price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Vihari",
      description: "A travel-site",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async()=>{
        const response = await fetch('http://localhost:4000/api/tour/tourbooking',{
          method:"POST",
          headers:{
            "auth-token":localStorage.getItem('token'),
            "Content-type":"application/json"
          },
          body:JSON.stringify({tour:tour,tickets:commonData.seats,price:price})
        })
        const json = await response.json();
        console.log(json)
       alert('Payment successful')
       navigate('/')
      },
      prefill: {
        name:'Nithin' ,
        email: commonData.email,
        contact:commonData.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new Razorpay(options);
    
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      alert('payment failed')
      navigate('/')
    });
  
    rzp1.open();
    };
  if (isLoading) return <Loader />;

  return (
    <> 
      <Navbar />
      <div>
        <h1 style={{ marginTop: '20px' }}>Tours</h1>
        <div id="pack" className="packages" style={{ marginTop: '40px' }}>
          <div className="container">
            <div className="packages-content">
              <div className="row">
                {tours.map((tour) => (
                  <div className="col-md-4 col-sm-6" key={tour._id}>
                    <div className="single-package-item">
                      <div>
                        <img style={{ height: '200px' }} src={`http://localhost:4000/${tour.DispImageurl}`} alt="package-place" />
                      </div>
                      <div className="single-package-item-txt">
                        <h3 >
                          <Link to={`/tourplaces/${tour._id}`} style={{textDecoration:'None'}}>{tour.tname}</Link>
                          <span className="pull-right" style={{paddingLeft:'15px'}}>
                            <i className="fa-solid fa-indian-rupee-sign"></i>
                            {tour.tprice}
                          </span>
                        </h3>
                        <div className="packages-para">
                          <p>
                            <i className="fa fa-angle-right"></i> 5-star accommodation
                          </p>
                          <p>
                            <span>
                              <i className="fa fa-angle-right"></i> transportation
                            </span>
                            <i className="fa fa-angle-right"></i> food facilities
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
                        <div className="about-btn">
                          <button style={{ backgroundColor: '#06bbcc' }} className="about-view packages-btn" data-bs-toggle="modal" data-bs-target="#tour-modal" onClick={toggleModal}>
                            Book now
                          </button>
                          <div class="modal" tabindex="-1" id="tour-modal">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h3 class="modal-title">Passenger Details</h3>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{fontSize:'15px '}}></button>
                                </div>
                                <div class="modal-body">
                                  <form style={{ boxShadow: '2px 1px 4px grey', padding: '5px' }}>
                                    <div className="form-group" style={{ display: 'flex', marginBottom:"10px" }}>
                                      <label htmlFor="email" style={{ width: '20%', fontSize: "15px" }}>Email</label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={commonData.email}
                                        onChange={handleCommonInputChange}
                                        style={{ width: "50%", fontSize:"15px" }}
                                      />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex' }}>
                                      <label htmlFor="mobile" style={{ width: '20%', fontSize: "15px" }}>Phone</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="mobile"
                                        placeholder="Enter your phone number"
                                        name="mobile"
                                        value={commonData.mobile}
                                        onChange={handleCommonInputChange}
                                        required
                                        style={{ width: "60%", fontSize:"15px" }}
                                        minLength={10}
                                        maxLength={10}
                                      />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', marginTop:"10px" }}>
                                    <label htmlFor="seats" style={{ width: '20%', fontSize: "15px" }}>Seats</label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="seats"
                                        name="seats"
                                        value={commonData.seats}
                                        onChange={(e)=>{handleCommonInputChange(e);}}
                                        style={{ width: "60%", fontSize:"15px" }}
                                        required
                                        min={1}
                                      />
                                      <input type="number" name="price" id="price" value={commonData.seats*tour.tprice} onChange={changePrice} style={{display:"none"}} />
                                    </div>
                                  </form>
                                </div>
                                <div class="modal-footer" >
                                  <h5>Price : <i class="fa-solid fa-indian-rupee-sign"></i>{commonData.seats*tour.tprice}</h5>
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style={{fontSize:"15px"}}>Close</button>
                                  <button type="button" class="btn btn-primary" style={{fontSize:"15px"}} data-bs-dismiss="modal" onClick={(e)=>{HandlePayment(e,tour)}}>Pay now</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tours;

