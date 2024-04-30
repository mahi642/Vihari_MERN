import React, { useContext, useEffect, useState } from 'react';
import bus1 from '../../Assets/bus1.png';
import bus3 from '../../Assets/bus3.jpg';
// import bus5 from '../../Assets/bus5.jpg';
import Layout from './Layout'
import Footer from './Footer';
import BusNav from './BusNav';
import userContext from '../../context/User/userContext';
const BusList = () => {
  const [selectedBus, setselectedBus] = useState();
  const [showSeats, setShowSeats] = useState(false);
  const {searchDetails} =useContext(userContext)
  const [buses, setbuses] = useState([
    { id: 1, trname: 'APSRTC', route: 'Route 1', deptime: '10:00 AM', arrtime: '2:00 PM', duration: '4 hours', btype: 'Express', tktprice: '320', image: bus1 },
    { id: 2, trname: 'PSR travels', route: 'Route 2', deptime: '12:00 PM', arrtime: '4:00 PM', duration: '4 hours', btype: 'Standard', tktprice: '230', image: bus3 },
    // Add more buses as needed
  ])
  
  const buslist = async()=>{
    if(searchDetails.srcname!=='' && searchDetails.destname!==''){
      
    const response = await fetch('http://localhost:4000/buslist',{
    method:'POST',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({srcname:searchDetails.srcname,destname:searchDetails.destname})  
    })
    const data = await response.json();
    setbuses(data)
  }
  }
  useEffect(()=>{
    buslist();
  },[searchDetails])
  const toggleSeats = (bus) => {

    if(showSeats && selectedBus === bus){
    setShowSeats(!showSeats);
    }
   else { setselectedBus(bus);
    setShowSeats(true)
   }
  };

  return (
    <> 
    <BusNav/>
   <div className="container-fluid mt-5">
      <h2 className="text-center mb-4">Bus List</h2>
      <table className="table" style={{fontSize:'60px',padding: '5px' }}>
        <thead>
         <tr>
            <th scope="col">Bus Image</th>
            <th scope="col">Bus Name</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Arrival Time</th>
            <th scope="col">Duration</th>
            <th scope="col">Bus Type</th>
            <th scope="col">Fare (₹)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <>
            <tr key={bus.id} className='bus-row'>
              <td>
                <img
                  src={`http://localhost:4000/${bus.Imageurl?.replace(/^.*backend\\/i, "")}`}
                  alt=""
                  style={{ height: '80px', objectFit: 'cover' }}
                />
              </td>
              <td>{bus.trname}</td>
              <td>{bus.deptime}</td>
              <td>{bus.arrtime}</td>
              <td>{bus.durtime}</td>
              <td>{bus.btype}</td>
              <td>₹{bus.tktprice}</td>
              <td>
                <button className="btn btn-primary" style={{ fontSize: '15px' }} onClick={() => toggleSeats(bus)}>
                  Select Seats
                </button>
              </td>
            </tr>
            <tr className='my-5'>
              <td colSpan='7' className='text-center' >
            {showSeats && selectedBus === bus && (
                    <div>
                      <Layout bus={bus} date={searchDetails.date}/>
                    </div>
                  )}
              </td>
            </tr>
           </>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default BusList;