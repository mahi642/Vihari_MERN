import React from "react"
import "../components/CSS/Contact.css";
import Left from "../components/UI/Left"
import Right from "../components/UI/Right"
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";

const Contact = ()=>{
    return(
        <>
        <Navbar />
        <h1 style={{marginTop:'20px'}}>Contact Us</h1>
        <div className = "contactUs">         
            <Left/>
            <Right/>
        </div>
        <Footer />
        </>
    )
}
export default Contact;