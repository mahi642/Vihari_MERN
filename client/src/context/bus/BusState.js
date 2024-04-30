import React, { useState } from 'react'
import busContext from './busContext'



const BusState = (props) => {
    const [selectedSeats, setselectedSeats] = useState({bus:null,seats:[]})
 const updateSeats = (bus,seats)=>{
    setselectedSeats({bus,seats:seats})
 }
 const orderRazorpay = async(price)=>{
  let response = await fetch('http://localhost:4000/order',{
   method:'POST',
   headers:{
   "Content-Type":"application/json"
   },
   body:JSON.stringify({price:price})
  })
  let res = await response.json()
  console.log(res);
  return res;
 }
  return (
   <busContext.Provider value={{updateSeats,selectedSeats,orderRazorpay}}>
    {props.children}
   </busContext.Provider>
  )
}

export default BusState