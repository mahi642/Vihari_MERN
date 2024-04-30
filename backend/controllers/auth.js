const bcrypt = require('bcryptjs')
const User = require('../models/user')
const JWT = require("jsonwebtoken")
const JWT_SECRET = "VihariTravelSite"
const Agent = require('../models/agent');
const Ticket = require('../models/ticket');
const tourTicket = require('../models/tourTickets');

// Verifying login credentials
module.exports.verifyUser =  async(req,res)=>{

    const {email,password} =req.body;
    try {
     let user,success;
    await User.findOne({email}).then((result)=>{
      user=result
     })
     if(user==null){
      return res.json({sucees:false,error:"User not found"})
     }
     const passCompare = await bcrypt.compare(password,user.password);
     if(!passCompare){
      success=false
      return res.json({success,error:"Invalid password"})
     }
     const data ={
      user:{
        id:user.id,
      }
    }
    const authToken = JWT.sign(data,JWT_SECRET);
    res.json({success:true,authToken,user})
    } catch (error) {
      console.log(error)
      res.send("Internal server error");
    }
  
}



// Signup for new user
module.exports.createUser = async(req,res)=>{
    await User.findOne({ email: req.body.email }).then(async user => {
        if (user) {
          return res.json({ error: "Email already exists!!" })
        }
        else {
         
          // Hashing password
          const salt = await bcrypt.genSalt(5);
          const secPass = await bcrypt.hash(req.body.password,salt) 
          
         await User.create({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            mobile:req.body.mobile,
            password: secPass
        }).then(async user => {

          // Creating authToken for user
          const data ={
            user:{
              id:user.id
            }
          }
          const authToken = await JWT.sign(data,JWT_SECRET)
          res.json({success:true,authToken,user})
  
        }).catch((error) => {
            console.log(error);
            res.json({error:"Internal server error"});
          })
        }
      })
  
}

// Fetching user details
module.exports.getUserDetails = async(req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user) {
      return res.json({ success: true, user });
    }

    return res.json({ success: false, error: "User not found" });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
}
// Getting user booking history
module.exports.getBookings = async(req,res)=>{
  try {
    const user = req.user;
    const tickets = await Ticket.find({user:user.id})
    res.json({success:true,tickets}) 
  } catch (error) {
    res.json({success:false,error:"Internal error"})
  }

}
module.exports.tourBookings = async(req,res)=>{
  try {
    const user = req.user;
    const tickets = await tourTicket.find({user:user.id})
    if(tickets){
      res.json({success:true,tickets})
    }
    else{
      res.json({success:false,error:'network error'})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,error:"Internal error"})
  }
}

module.exports.verifyAgent = async (req, res) => {
  const { email, password } = req.body;
  try {
    let agent, success;
    await Agent.findOne({ email }).then((result) => {
      agent = result;
    });

    if (agent == null) {
      return res.json({ success: false, error: "Agent not found" });
    }

    const passCompare = await bcrypt.compare(password, agent.password);
    if (!passCompare) {
      success = false;
      return res.json({ success, error: "Invalid password" });
    }

    if (agent.flag !== 1 || agent.blocked) {
      return res.json({ success: false, error: "Agent is not authorized to log in" });
    }

    const data = {
      agent: {
        id: agent.id,
      },
    };

    const agentId=agent._id;

    const authToken = JWT.sign(data, JWT_SECRET);
    res.json({ success: true, authToken, agent,agentId });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

module.exports.createAgent = async(req,res)=>{
  await Agent.findOne({ email: req.body.email }).then(async user => {
      if (user) {
        return res.json({ error: "Email already exists!!" })
      }
      else {
       
        // Hashing password
        const salt = await bcrypt.genSalt(5);
        const secPass = await bcrypt.hash(req.body.password,salt) 
        const doc=req.file;
        const document=doc.path;
        
        // Creating a user
       await Agent.create({
          agentName: req.body.agentName,
          email: req.body.email,
          password: secPass,
          document:document
      }).then(agent => {

        // Creating authToken for user

        const authToken =JWT.sign(agent.id,JWT_SECRET)
        res.json({success:true,authToken,agent})

      }).catch((error) => {
          console.log(error);
          // sending errors
          res.json({error:"Internal server error"});
        })
      }
    })

}