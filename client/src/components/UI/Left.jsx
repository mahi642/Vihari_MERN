import React from "react";
import "../CSS/Left.css";

const Left = () => {  
  return (
    <div className="left">
      <p>Send a Message</p>
      <form className="left-form" >
        <input type="text" placeholder=" First Name" onChange={(e)=>{}} />
        <input type="text" placeholder=" Last Name" />
        <input type="number" placeholder=" Mobile Number" />
        <input type="email" placeholder=" email" />
        <textarea
          name="message"
          id=""
          placeholder="Enter The message"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Left;