const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
const helmet = require('helmet');
const path=require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const app = express()
app.use(express.json())

// app.use(helmet())
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());
app.use(cors({
  origin:["https://deploy-mern-1whq.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}))


const accessLogStream = rfs.createStream("access.log",{
  interval:'1d',
  path:path.join(__dirname, 'logs')
})
app.use(morgan('combined',{stream:accessLogStream}))
// Routing..
app.use(require('./routes/auth'))
 
const agentRoutes=require('./routes/agent');
const adminRoutes=require('./routes/admin');
const tourRoutes = require('./routes/tour');
const testRoutes = require('./routes/test')
app.use('/api/agent',agentRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/tour',tourRoutes);
app.use(require('./routes/bus'))
app.use("/api",testRoutes)


app.get('/',(req,res)=>{
  res.send("Hello World!")
})

// inbuilt middleware
// app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images',express.static(__dirname+'/public/Images'));

app.use('/error',(req,res,next)=>{
  throw new Error("new error")
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


mongoose
  .connect(
    "mongodb+srv://Srikar:Sailu3002@cluster0.ch9hacp.mongodb.net/Vihari"
  ) 
  .then((result) => {
    app.listen(4001, () => {
      console.log("listening to port 4000");
    });
    console.log("Mongodb connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));
