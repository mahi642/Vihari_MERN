const Tour = require('../models/tour');
const tourTicket = require('../models/tourTickets');


exports.getAllTours=async (req,res)=>{
    var search=req.body.tname;
    // console.log(search)
    if(!search)
    search=''
    const regex = new RegExp(search, "i");

    // const filteredtours=await tours.find({ tname: { $regex: regex } });
    // console.log(filteredtours)
    // res.render('tours',{tours:filteredtours});
    Tour.find({tname:{$regex:regex}})
    .then((tours)=>{
        // console.log(tours)
        res.render('tours',{tours:tours});
    })
    .catch((err)=>{
        console.log(err);
    })

};

exports.getMoreTours=(req,res)=>{
    const {offset} = req.query;
    Tour.find({}).skip(offset).limit(3)
    .then((tours)=>{
        res.json(tours);
    })
    .catch((err)=>{
        console.log(err);
        res.status(401)
    })

};
exports.booking = async(req,res)=>{
    
    try {
        const user = req.user.id;
        const {tour,tickets,price} = req.body;
        const Ticket = await tourTicket.create({user,tour:tour._id,tickets,price})
        if(Ticket){
            res.json({success:true}) 
        }
        else {
            res.json({success:false,error:"Tour not booked"})
        }
          
    } catch (error) {
        console.log(error);
       res.json({success:false,error:"Internal error"}) 
    }
    
}
module.exports.getTour = async(req,res)=>{
    try {
        const {id} = req.body
    const tour = await Tour.findById(id);
    if(tour){
        res.json({success:true,tour})
    }
    else {
        res.json({success:false,error:"Slow network"})
    } 
    } catch (error) {
        console.log(error)
        res.json({success:false,error:"Internal error"})
    }
}