
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// admin registration

const adminModel = require("../model/adminModel");
const { validateName, validateEmail } = require("../validation/validator");
const HttpError = require("../model/httpError");

const register = async (req,res, next) =>{
   
    try {

        const adminData = req.body;
        const {name, email,password, phone,gender,howDidYouHearAboutThis, city, state } = adminData
        
        // validations

        // name
        if(!name){
            return next(new HttpError("name is required", 400))
        }
        if(validateName(name) === false){
            return res.status(400).send({status : false, message : "name should contain alphabets only"})
        }

        // email
        if(!email){
            return next(new HttpError("email is required", 400))
        }
        if(validateEmail(email) === false){
            return res.status(400).send({status : false, message : "email should contain alphaNumerics only"})
        }

        // password
        if(!password){
            return next(new HttpError("password is requried", 400))
        }
         adminData.password = await bcrypt.hash(password,10);
        
        // phone
        if(!phone){
            return next(new HttpError("phone is required", 400))
        }
        
        if(phone.length !== 10){
            return res.status(400).send({status : false, message : "phone should contain 10 digits only"})
        }

        // gender
        if(!gender){
            return next(new HttpError("gender is requried", 400))
        }

        // how did you hear about this
        if(!howDidYouHearAboutThis){
            return next(new HttpError("how did you hear about this is required", 400))
        }
        
        // city
        if(!city){
            return next(new HttpError("city is required", 400))
        }
        if(city !== "Mumbai" && city !== "Pune" && city !== "Ahmedabad"){
            return next(new HttpError("please provide one city out of this [Mumbai,Pune,Ahmedabad]", 400)) 
        }

        // state
        // if(!state){
        //     return next(new HttpError("state is required", 400))
        // }
        // if(state !== "Maharashtra" && state !== "Karnataka" && state !== "Gujrat"){
        //    return next(new HttpError("please provide one state out of this [Gujrat,Maharashtra,Karnataka]", 400))
        // }

        // checking emial already exist or not
        const existingEmail = await adminModel.findOne({email});
        if(existingEmail){
            return res.status(200).send({status : false, message : "Email already registerd, Go to login"});
            // status 200 to show on toast message
        }

        // checking phone number already exist or not
        const existingPhone = await adminModel.findOne({phone});
        if(existingPhone){
            return res.status(200).send({status : false, message : "Phone already registerd, Go to login"});
        }

        // saving admin details to database
        const savedAdmin = await adminModel.create(adminData);
        console.log(savedAdmin)
        return res.status(201).send({status : true, message : "Registration Successfull", savedAdmin})
    }
    catch(error){
        return next(new HttpError("error in register admin", 500))
    }
}


// =============================================================================================================

// login api

const login = async (req,res, next) =>{
   
    try {
        
        const data = req.body;
        const {email, password} = data;

        // admin validation
        if( !email || !password){
            return next(new HttpError("email and password is required", 400))
        }

        // checking admin exist or not
        const existingAdmin = await adminModel.findOne({email});
        if(!existingAdmin){
            return res.status(200).send({status : false, message : "Email not found, Please register"});
        }

        // checking password is matching or not
        const matchedPassword = await bcrypt.compare(password, existingAdmin.password);
        if(!matchedPassword){
            return res.status(200).send({status : false, message : "Email or password is incorrect"})
        }

        const token = jwt.sign({adminId : existingAdmin._id},"this-is-secretkey", {expiresIn : "50min"})

        return res.status(200).send({status : true, message : "Login Successful", token})

    } catch (error) {
         return next(new HttpError("error in Login user", 500))
    }
}
module.exports = {register, login}