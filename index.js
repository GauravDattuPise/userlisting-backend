
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

// connecting to mongodb
mongoose.connect("mongodb+srv://gauravpise87:Gaurav2001@gauravdb.crgpvot.mongodb.net/userListing")
.then(()=>console.log("DB is connected"))
.catch((err)=>console.log("error in connecting with db", err.message));

// path to admin route
app.use("/admin", require("./src/route/adminRoute"))

// path to user route
app.use("/user", require("./src/route/userRoute"));

// route not found
app.use((err,req,res)=>{
  const error = new HttpError("could not found path", 404);
  throw error;
})

// global middleware to handle errors
app.use((error, req, res, next) => {
     
  if(res.headerSent){
      return next(error)
  } 

  res.status(error.code || 500)
  res.json({ message : error.message || "An unknown error occured"})
})

// application running on server
app.listen(5000, ()=>{
    console.log("server is running on port", 5000);
});



