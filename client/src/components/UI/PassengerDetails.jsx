import React, { useContext, useState, useCallback} from 'react';
import busContext from '../../context/bus/busContext';
import '../CSS/PassengerDetails.css'
import Footer from './Footer';
import BusNav from './BusNav';
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom';
import Bus from '../../Assets/city bus.gif'
import userContext from '../../context/User/userContext';

const PassengerDetails = () => {
 const [Razorpay] = useRazorpay()
  const { setselectedseats,selectedSeats,orderRazorpay } = useContext(busContext);
  const {searchDetails} = useContext(userContext)
  const navigate = useNavigate()
  // Initialize forms for each selected seat
  const initialFormsData = selectedSeats.seats.reduce((acc, seat) => {
    acc[seat] = { name: '', age: '', gender: '' };
    return acc;
  }, {});

  const [formsData, setFormsData] = useState(initialFormsData);
  const [commonData, setCommonData] = useState({
    email: '',
    phoneNumber: '',
  });

  const handleCommonInputChange = (e) => {
    const { name, value } = e.target;
    setCommonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePassengerInputChange = (seat, e) => {
    const { name, value } = e.target;
    setFormsData((prevData) => ({
      ...prevData,
      [seat]: {
        ...prevData[seat],
        [name]: value,
      },
    }));
  };

  const bookSeats = async()=>{
    const data = selectedSeats.seats.map(seat => ({seat:seat,...formsData[seat]}));
    alert('payment successfull')
    const response = await fetch('http://localhost:4000/booking',{
      method:'POST',
      headers:{
        "Content-type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({bus:selectedSeats.bus,seats:data,date:searchDetails.date})
    })
    const json = await response.json();
    if(json.success){
      alert("Booking successful");
      navigate('/')
    }
    else {
      alert("Booking failed ! Your amount will return to your account in 3-5 hours")
      navigate('/')
    }
  }

  const handlePayNow = async() => {
   
    console.log('Payment logic goes here');
   let order = await orderRazorpay(selectedSeats.seats.length * selectedSeats.bus.tktprice)
   const options = {
    key: "rzp_test_lQaiC5AbagJXwZ", // Enter the Key ID generated from the Dashboard
    amount: selectedSeats.seats.length * selectedSeats.bus.tktprice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Vihari",
    description: "A travel-site",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: ()=>{
      bookSeats()
    },
    prefill: {
      name:'Nithin' ,
      email: commonData.email,
      contact:commonData.phoneNumber,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.on("payment.success",async(res)=>{
    const data = selectedSeats.seats.map(seat => ({seat:seat,...formsData[seat]}));
    setselectedseats({...selectedSeats,seats:data})
    alert('payment successfull')
    const response = await fetch('http://localhost:4000/booking',{
      method:'POST',
      headers:{
        "Content-type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({bus:selectedSeats.bus,seats:data,date:searchDetails.date})
    })
    const json = await response.json();
    if(json.success){
      alert("Booking successful");
      navigate('/')
    }
    else {
      alert("Booking failed ! Your amount will return to your account in 3-5 hours")
      navigate('/')
    }
  })
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

  return (
    <>
    <BusNav/>
    <div className="container custom-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Passenger Details</h1>
          <form style={{boxShadow:'2px 1px 4px grey',padding:'1%'}}>
            <div className="form-group passenger-details my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control passenger-input"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={commonData.email}
                onChange={handleCommonInputChange} style={{fontSIze:'15px'}}
              />
            </div>
            <div className="form-group passenger-details my-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control passenger-input"
                id="phoneNumber"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={commonData.phoneNumber}
                onChange={handleCommonInputChange} style={{fontSIze:'15px'}}
              />
            </div>
          </form>
          {selectedSeats.seats.map((seat) => (
            <form key={seat} className='my-5' style={{boxShadow:'2px 1px 4px grey',padding:'1%'}}>
              <h4>Seat {seat}</h4>
              <div className="form-group passenger-details my-3">
                <label htmlFor={`name-${seat}`}>Name</label>
                <input
                  type="text"
                  className="form-control passenger-input"
                  id={`name-${seat}`}
                  placeholder="Enter passenger name"
                  name="name"
                  value={formsData[seat].name}
                  onChange={(e) => handlePassengerInputChange(seat, e)}
                />
              </div>
              <div className="form-group passenger-details my-3">
                <label htmlFor={`age-${seat}`}>Age</label>
                <input
                  type="number"
                  className="form-control passenger-input"
                  id={`age-${seat}`}
                  placeholder="Enter passenger age"
                  name="age"
                  value={formsData[seat].age}
                  onChange={(e) => handlePassengerInputChange(seat, e)}
                  min={7}
                />
              </div>
              <div className="form-group passenger-details my-3">
                <label htmlFor={`gender-${seat}`}>Gender</label>
                <input
                  type="text"
                  className="form-control passenger-input"
                  id={`gender-${seat}`}
                  placeholder="Enter passenger gender"
                  name="gender"
                  value={formsData[seat].gender}
                  onChange={(e) => handlePassengerInputChange(seat, e)}
                />
              </div>
            </form>
          ))}
          <button className="btn btn-primary pay-now" onClick={handlePayNow}>
            Pay Now
          </button>
        </div>
        <div className='col-md-6'>
          <img src={Bus}  alt=''/>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PassengerDetails;