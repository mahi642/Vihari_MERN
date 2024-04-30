// import { jwtDecode } from "jwt-decode"

const Ticket = require("../models/ticket");
const User = require("../models/user");
exports.getUserTripsByBusId = async (req,res) =>{

    try {
        const {busId} = req.params;
        // console.log(busId);
        const getDetails = await Ticket.find({bus : busId.toString()})
        res.json({getDetails})

    } catch (error) {
        console.log(error);
        res.status(400).json({msg :"cannot find bus with given Id"})
    }
}

module.exports.getUserDetailsById = async(req,res)=>{
    try {
      const {userId} = req.params;
      const user = await User.findById(userId);
      console.log()
  
    //   if (user) {
    //     return res.json({ success: true, user });
    //   }
  
      return res.json({user});
    } catch (error) {
      console.error("Error in getUserDetails:", error);
      return res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }