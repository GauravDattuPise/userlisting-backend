
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ["Male","Female","Other"]
    },
    howDidYouHearAboutThis :{
        type : [String],
        required : true,
        enum : ["LinkedIn","Friends","Job Portal","Others"]
    },
    city : {
        type : String,
        required : true,
        enum : ["Mumbai", "Pune", "Ahmedabad"]
    }  
})

module.exports = mongoose.model("Admin", adminSchema);