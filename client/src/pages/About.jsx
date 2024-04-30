import React from "react"
import AboutUs  from "../components/UI/AboutUs";
import Management from "../components/UI/Management"
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";

const About = ()=>{
  return(
    <div className ="App">
        <Navbar />
        <AboutUs/>
        <Management/>
        <Footer />
    </div>
  )
}
export default About;