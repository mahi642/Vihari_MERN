/* eslint-disable jsx-a11y/aria-role */
import React, { useContext, useState, useEffect } from "react";
import "../CSS/Layout.css";
import busContext from "../../context/bus/busContext";
import { useNavigate } from "react-router-dom";

const Layout = ({bus,date}) => {
 const navigate =useNavigate()
  
  const {updateSeats} = useContext(busContext)
   const [selectedSeats, setselectedSeats] = useState([])
   const [Bseats, setBseats] = useState([])
   const booked = async(bus)=>{
     const id =bus._id
     const response = await fetch('http://localhost:4000/bookedseats',{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({id,date})
     })
     const json= await response.json();
    //  console.log(typeof(json.bookings))
     if(json.bookings.length>0){
      json.bookings.forEach(async booking=>{
        
        console.log(booking.tickets)
        setBseats((Bseats) => [
          ...Bseats,
          ...booking.tickets.map((ticket) => ticket.seat),
        ]);
      });
     }
     console.log(Bseats)  
   }
   useEffect(() => {
    setBseats([])  
    booked(bus) 
   }, [bus,date])
  
   const onchange = (e)=>{
   if(e.target.checked){ 
   setselectedSeats([...selectedSeats,e.target.id])
   }
   else {
    setselectedSeats(selectedSeats.filter((id)=>id!==e.target.id))
   } 
   } 
   const handleOnSubmit = (e)=>{
    e.preventDefault()
    if(selectedSeats.length>0){
    updateSeats(bus,selectedSeats)
    navigate('/passengers')
    }
    else {
      alert('Select a seat')
    }
   } 
  return (
<div className="container-fluid bus-layout my-5">
<ol className="d-flex">
    <li className="row row--1">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="1A" disabled={Bseats.includes('1A')} />
          <label htmlFor="1A">1A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="1B" disabled={Bseats.includes('1B')} />
          <label htmlFor="1B">1B</label>
        </li>
         <li className="my-4">

         </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} disabled={Bseats.includes('1C')} id="1C" />
          <label htmlFor="1C">1C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="1D" disabled={Bseats.includes('1D')} />
          <label htmlFor="1D">1D</label>
        </li>
      </ol>
    </li>
    <li className="row row--2">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="2A" disabled={Bseats.includes('2A')} />
          <label htmlFor="2A">2A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="2B" disabled={Bseats.includes('2B')} />
          <label htmlFor="2B">2B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="2C" disabled={Bseats.includes('2C')} />
          <label htmlFor="2C">2C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="2D" disabled={Bseats.includes('2D')} />
          <label htmlFor="2D">2D</label>
        </li>
      </ol>
    </li>
    <li className="row row--3">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="3A" disabled={Bseats.includes('3A')} />
          <label htmlFor="3A">3A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="3B" disabled={Bseats.includes('3B')} />
          <label htmlFor="3B">3B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="3C" disabled={Bseats.includes('3C')}/>
          <label htmlFor="3C">3C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="3D" disabled={Bseats.includes('3D')}/>
          <label htmlFor="3D">3D</label>
        </li>

      </ol>
    </li>
    <li className="row row--4">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="4A" disabled={Bseats.includes('4A')} />
          <label htmlFor="4A">4A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="4B" disabled={Bseats.includes('4B')}/>
          <label htmlFor="4B">4B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="4C" disabled={Bseats.includes('4C')} />
          <label htmlFor="4C">4C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="4D" disabled={Bseats.includes('4D')} />
          <label htmlFor="4D">4D</label>
        </li>
      </ol>
    </li>
    <li className="row row--5">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="5A" disabled={Bseats.includes('5A')} />
          <label htmlFor="5A">5A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="5B" disabled={Bseats.includes('5B')} />
          <label htmlFor="5B">5B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="5C" disabled={Bseats.includes('5C')} />
          <label htmlFor="5C">5C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="5D" disabled={Bseats.includes('5D')}/>
          <label htmlFor="5D">5D</label>
        </li>

      </ol>
    </li>
    <li className="row row--6">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="6A" disabled={Bseats.includes('6A')} />
          <label htmlFor="6A">6A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="6B" disabled={Bseats.includes('6B')} />
          <label htmlFor="6B">6B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="6C" disabled={Bseats.includes('6C')} />
          <label htmlFor="6C">6C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="6D" disabled={Bseats.includes('6D')} />
          <label htmlFor="6D">6D</label>
        </li>

      </ol>
    </li>
    <li className="row row--7">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="7A" disabled={Bseats.includes('7A')} />
          <label htmlFor="7A">7A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="7B" disabled={Bseats.includes('7B')}/>
          <label htmlFor="7B">7B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="7C" disabled={Bseats.includes('7C')}/>
          <label htmlFor="7C">7C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="7D" disabled={Bseats.includes('7D')}/>
          <label htmlFor="7D">7D</label>
        </li>

      </ol>
    </li>
    <li className="row row--8">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="8A" disabled={Bseats.includes('8A')} />
          <label htmlFor="8A">8A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="8B" disabled={Bseats.includes('8B')} />
          <label htmlFor="8B">8B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="8C" disabled={Bseats.includes('8C')} />
          <label htmlFor="8C">8C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="8D" disabled={Bseats.includes('8D')} />
          <label htmlFor="8D">8D</label>
        </li>

      </ol>
    </li>
    <li className="row row--9">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="9A" disabled={Bseats.includes('9A')} />
          <label htmlFor="9A">9A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="9B" disabled={Bseats.includes('9B')} />
          <label htmlFor="9B">9B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="9C" disabled={Bseats.includes('9C')} />
          <label htmlFor="9C">9C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="9D" disabled={Bseats.includes('9D')} />
          <label htmlFor="9D">9D</label>
        </li>

      </ol>
    </li>
    <li className="row row--10">
      <ol className="seats" type="A">
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="10A" disabled={Bseats.includes('10A')} />
          <label htmlFor="10A">10A</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="10B" disabled={Bseats.includes('10B')} />
          <label htmlFor="10B">10B</label>
        </li>
        <li className="my-4">

        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="10C" disabled={Bseats.includes('10C')} />
          <label htmlFor="10C">10C</label>
        </li>
        <li className="seat my-2 mx-3">
          <input type="checkbox" onChange={(e)=>{onchange(e)}} id="10D" disabled={Bseats.includes('10D')} />
          <label htmlFor="10D">10D</label>
        </li>
      </ol>
    </li>

  </ol>
  <div className="my-5">
    <button className="btn btn-primary" style={{fontSize:'15px'}}
    onClick={(e)=>{handleOnSubmit(e)}}>
    Book Now!
    </button></div>
</div>
  );
};

export default Layout;