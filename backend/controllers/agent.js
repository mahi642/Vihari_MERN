const Bus = require("../models/buses");
const Agent=require('../models/agent');
const Tour=require('../models/tour');
const Place=require('../models/place');

exports.addBus = async (req, res) => {
  const {
    srcname,
    destname,
    bname,
    deptime,
    arrtime,
    durtime,
    tktprice,
    btype,
    agentId
  } = req.body;
  const BusImage = req.file;
  const Imageurl = BusImage.path;
  try {
    const newBus = new Bus({
      srcname,
      destname,
      trname: bname,
      deptime,
      arrtime,
      durtime,
      tktprice,
      btype,
      Imageurl,
      agent: agentId,
    });
    const result = await newBus.save();
    const agent =await Agent.findById(agentId);
    agent.buses.push(result._id);
    await agent.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding bus:", error);
    res
      .status(500)
      .json({ message: "Adding Bus failed, please try again later." });
  }
};

exports.getBuses = async (req, res) => {
  try {

    const Buses = await Bus.find({});
    res.status(200).json({ buses: Buses });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching buses" });
  }
};

exports.getAgentBuses = async (req, res) => {
  try {
    const agentId=req.params.agentId;
    const agent = await Agent.findById(agentId).populate('buses');
    const Buses=agent.buses;
    // console.log(Buses);
    res.status(200).json({ buses: Buses });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching buses" });
  }
};


exports.deleteBus =  (req, res) => {
  const busId=req.params.busId;
   Bus.findByIdAndDelete(busId)
   .then((deletedBus)=>{
    if(!deletedBus){
      return res.status(404).json({message: "Bus not found"});
    }
   }).then((bus)=>{
    res.status(200).json({message: "Bus deleted successfully  "});
   })
   .catch((error)=>{
    res.status(500).json({message:"Internal server error"});
   })
};

exports.getBusDetails=async (req,res)=>{

  try{
    const busId=req.params.busId;
    const busData=await Bus.findById(busId);
    res.status(200).json({bus:busData});
  } catch(error){
    res.status(500).json({ message: "Error while fetching bus" });
  }  
}

exports.editBus = async (req, res) => {
  const {
    srcname,
    destname,
    bname,
    deptime,
    arrtime,
    durtime,
    tktprice,
    btype,
  } = req.body;
  const busId = req.params.busId; 

  try {
    const busToUpdate = await Bus.findById(busId);
    if (!busToUpdate) {
      return res.status(404).json({ message: "Bus not found" });
    }

    busToUpdate.srcname = srcname;
    busToUpdate.destname = destname;
    busToUpdate.trname = bname;
    busToUpdate.deptime = deptime;
    busToUpdate.arrtime = arrtime;
    busToUpdate.durtime = durtime;
    busToUpdate.tktprice = tktprice;
    busToUpdate.btype = btype;

    const updatedBus = await busToUpdate.save();

    res.status(200).json({bus:updatedBus});
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ message: "Updating bus failed, please try again later." });
  }
};

exports.addTour = async (req, res) => {
  const { tname, tprice, agentId } = req.body;
  const TourImage = req.file;
  const DispImageurl = TourImage.path;

  try {
    const newTour = new Tour({
      tname,
      tprice,
      DispImageurl,
      agentId,
    });

    const result = await newTour.save();
    const agent=await Agent.findById(agentId);
    agent.tours.push(result._id);
    await agent.save();

    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding tour:", error);
    res
      .status(500)
      .json({ message: "Adding Tour failed, please try again later." });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.status(200).json({ tours:tours });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching tours" });
  }
};

exports.deleteTour = (req, res) => {
  const tourId = req.params.tourId;

  Tour.findByIdAndDelete(tourId)
    .then((deletedTour) => {
      if (!deletedTour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.status(200).json({ message: "Tour deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getTourDetails = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tourData = await Tour.findById(tourId);
    res.status(200).json({ tour: tourData });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching tour" });
  }
};


exports.editTour = async (req, res) => {
  const { tourName, tourPrice } = req.body;
  const tourId = req.params.tourId;

  try {
    const tourToUpdate = await Tour.findById(tourId);
    if (!tourToUpdate) {
      return res.status(404).json({ message: "Tour not found" });
    }

    tourToUpdate.tname = tourName;
    tourToUpdate.tprice = tourPrice;

    const updatedTour = await tourToUpdate.save();

    res.status(200).json({ tour: updatedTour });
  } catch (error) {
    console.error("Error updating tour:", error);
    res
      .status(500)
      .json({ message: "Updating tour failed, please try again later." });

  }
};

exports.getAgentTours = async (req, res) => {
  try {
    const agentId=req.params.agentId;
    const agent = await Agent.findById(agentId).populate('tours');
    const   Tours=agent.tours;
  
    res.status(200).json({ tours: Tours });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching tours" });
  }
};



exports.addPlace = async (req, res) => {
  const { title, description } = req.body;
  const placeImage = req.file;
  const Imageurl = placeImage.path;

  try {
    const newPlace = new Place({
      name:title,
      description,
      Imageurl,
      tour: req.params.tourId
    });

    const result = await newPlace.save();

    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding place:", error);
    res
      .status(500)
      .json({ message: "Adding Place failed, please try again later." });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find({ tour: req.params.tourId }); 
    res.status(200).json({ places:places });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching places" });
  }
};

exports.deletePlace = (req, res) => {
  const placeId = req.params.placeId;

  Place.findByIdAndDelete(placeId)
    .then((deletedPlace) => {
      if (!deletedPlace) {
        return res.status(404).json({ message: "Place not found" });
      }
      res.status(200).json({ message: "Place deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getAgentProfile=async (req,res)=>{
  try{
    const agentId = req.params.agentId;
    const agentUser= await Agent.findById(agentId);
    if(!agentUser){
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json({ agent : agentUser});

  } catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.agentEditProfile= async (req,res)=>{
  try{
    const agentId = req.params.agentId;
    const agentUser= await Agent.findById(agentId);
    if(!agentUser){
      return res.status(404).json({ message: "Agent not found" });
    }
    const {agentName,email}=req.body;
    agentUser.email=email;
    agentUser.agentName=agentName;
    await agentUser.save();
    res.status(200).json({ agent : agentUser,message:"Agent data saved successfully"});
  } catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
}