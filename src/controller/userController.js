

const HttpError = require("../model/httpError");
const userModel = require("../model/userModel");

const addUser = async (req,res,next)=>{
    try {
        const userData  = req.body
        const {name, email, phone} = userData;

        // validations
        if(!name){
            return next(new HttpError("name is required", 400))
        }
        if(!email){
            return next(new HttpError("email is required", 400))
        }
        if(!phone){
            return next(new HttpError("phone is required", 400))
        }
       
        userData.adminId = req.adminId;

        // checking user exist or not
        const existingEmail = await userModel.findOne({email});
        if(existingEmail){
            return res.status(200).send({status : false, message : "User email alredy exists"});
        }

        // checking user exist or not
        const existingPhone = await userModel.findOne({phone});
        if(existingPhone){
            return res.status(200).send({status : false, message : "User phone already exists"});
        }

        // adding user to database
        const addedUser = await userModel.create(userData);
        return res.status(201).send({status : true, message : "user added successfully", addedUser})        

    } catch (error) {
        return next(new HttpError("server error in add user", 5000))
    }
}


// =============================  getting user details


const getUserDetails = async (req,res) => {
    try {
        const adminId = req.adminId
        console.log("admin id is", adminId)
        const userDetails = await userModel.find({adminId})
        return res.status(200).send({status : true, userDetails })
    } catch (error) {
        return res.status(500).send({status : false, message : "error in getting user details user", error : error.message})
    }
}

// get single user details to update

const getSingleUser = async (req,res) => {
    try {
        const {userId} = req.params
        console.log(userId)
        const user = await userModel.findOne({_id : userId})
        console.log("user is", user);
        return res.status(200).send({status : true, user : user })
    } catch (error) {
        return res.status(500).send({status : false, message : "error in get single user", error : error.message})
    }
}


// update user
const updateUser = async (req,res) => {
    try {
        const {userId} = req.params
        const updatedData = req.body
        const {name, email, phone} = updatedData

        await userModel.findOneAndUpdate({_id : userId}, {$set : {name : name, email : email, phone : phone}}, {new : true})

        return res.status(200).send({status : true, message : "user updated successfully" })
    } catch (error) {
        return res.status(500).send({status : false, message : "error in get single user user", error : error.message})
    }
}


// delete user

const deleteUser = async (req,res) => {
    try {
        const {userId} = req.params
        await userModel.findByIdAndDelete(userId);
        return res.status(200).send({status : true, message : "User deleted"});
    } catch (error) {
        return res.status(500).send({status : false, message : "error in get delete user", error : error.message}) 
    }
}

module.exports = {addUser, getUserDetails, getSingleUser, updateUser, deleteUser}