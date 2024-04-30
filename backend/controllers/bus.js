const Bus = require('../models/buses');
const bus = require('../models/buses')
const Ticket = require('../models/ticket')

module.exports.busList = async(req,res)=>{
   const {srcname,destname} = req.body;
   const buslist = await bus.find({srcname:srcname.toLowerCase(),destname:destname.toLowerCase()})
   if(buslist){
    res.json(buslist)
   }
}
module.exports.booking = async(req,res)=>{
   try {
      const user = req.user
      const {bus,seats,date} = req.body;
      const book = await Ticket.create({user:user.id,bus:bus._id,tickets:seats,date:date});
      if(book){
         res.json({success:true})
      }
      else {
         res.json({success:false,error:"Booking unsuccessful"})
      }
   } catch (error) {
      res.json({success:false,error:'Internal error'})
   }

}
module.exports.getBusDetails = async(req,res)=>{
   try {
      const {id} = req.body;
      const bus = await Bus.findById(id);
      res.json({success:true,bus:bus});  
   } catch (error) {
      console.log(error)
      res.json({success:false,error:error})
   }
   
} 
module.exports.booked = async(req,res)=>{
   try {
     const {id,date} = req.body
      const bookings = await Ticket.find({bus:id,date});
      if(bookings){ 
         res.json({success:true,bookings});   
      } 
      else {
         res.json({success:false,error:"Failed to fetch"})
      }
   } catch (error) {
      res.json({success:false,error:"Internal error"})
   }
}