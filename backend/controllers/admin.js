const User = require('../models/user');
const Agent = require('../models/agent');
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const bcrypt=require('bcryptjs');

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vihari.t05@gmail.com",
    pass: "gyeeyglwekzwuwzy",
  },
});

exports.postsendmail = async (req, res, next) => {
  try {
    const { subject, message } = req.body;
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const emailList = users.map((user) => user.email);

    const mailOptions = {
      from: "vihari.t05@gmail.com",
      to: emailList.join(","),
      subject: subject,
      text: message,
    };

    const info = await mailTransporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    
    return res.status(200).json({ message: "Mail Sent to all users" });
  } catch (error) {
    console.log(`Error occurred while sending email: ${error}`);
    return res.status(500).json({ error: "Error occurred while sending email" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    res.status(200).json({ users: Users });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching users" });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const Agents = await Agent.find({});
    res.status(200).json({ agents: Agents });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching users" });
  }
};

exports.acceptAgent = async (req, res) => {
  const agentId = req.params.agentId;
  try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    agent.flag = 1; // Update flag to 1 for accepted agent
    await agent.save();

    // Send email to the agent
    const mailOptions = {
      from: "vihari.t05@gmail.com",
      to: agent.email,
      subject: "Agent Status Update",
      text: "Congratulations! Your agent status has been accepted.",
    };

    await mailTransporter.sendMail(mailOptions);
    
    res.status(200).json({ message: "Agent accepted successfully" });
  } catch (error) {
    console.error("Error accepting agent:", error);
    res.status(500).json({ message: "Error accepting agent" });
  }
};

exports.blockAgent = async (req, res) => {
  const agentId = req.params.agentId;
  try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    agent.blocked = true;
    await agent.save();

    // Send email to the agent
    const mailOptions = {
      from: "vihari.t05@gmail.com",
      to: agent.email,
      subject: "Agent Status Update",
      text: "Your agent account has been blocked.",
    };

    await mailTransporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Agent blocked successfully' });
  } catch (error) {
    console.error('Error blocking agent:', error);
    res.status(500).json({ message: 'Error blocking agent' });
  }
};

exports.unblockAgent = async (req, res) => {
  const agentId = req.params.agentId;
  try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    agent.blocked = false;
    await agent.save();

    // Send email to the agent
    const mailOptions = {
      from: "vihari.t05@gmail.com",
      to: agent.email,
      subject: "Agent Status Update",
      text: "Your agent account has been unblocked.",
    };

    await mailTransporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Agent unblocked successfully' });
  } catch (error) {
    console.error('Error unblocking agent:', error);
    res.status(500).json({ message: 'Error unblocking agent' });
  }
};

exports.addUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = req.body;
  try {
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword,
    });

    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Adding User failed, please try again later." });
  }
};


exports.deleteUser =  (req, res) => {
  const userId=req.params.userId;
  User.findByIdAndDelete(userId)
   .then((deletedUser)=>{
    if(!deletedUser){
      return res.status(404).json({message: "User not found"});
    }
   }).then((user)=>{
    res.status(200).json({message: "User deleted successfully  "});
   })
   .catch((error)=>{
    res.status(500).json({message:"Internal server error"});
   })
};

exports.rejectAgent = async (req, res) => {
  const agentId = req.params.agentId;
  try {
    const agent = await Agent.findByIdAndDelete(agentId);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const mailOptions = {
      from: "vihari.t05@gmail.com",
      to: agent.email,
      subject: "Agent Status Update",
      text: "Your agent application has been rejected.",
    };

    await mailTransporter.sendMail(mailOptions);
    
    res.status(200).json({ message: "Agent rejected successfully" });
  } catch (error) {
    console.error("Error rejecting agent:", error);
    res.status(500).json({ message: "Error rejecting agent" });
  }
};

exports.userEditProfile= async (req,res)=>{
  try{
    const userId = req.params.userId;
    const User= await Agent.findById(userId);
    if(!User){
      return res.status(404).json({ message: "User not found" });
    }
    const {firstName,lastName,email,mobile}=req.body;
    User.firstName = firstName;
    User.lastName = lastName;
    User.email=email;
    User.mobile = mobile;
    await User.save();
    res.status(200).json({ agent : User,message:"User data saved successfully"});
  } catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
}
