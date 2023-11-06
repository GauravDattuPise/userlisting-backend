
const express = require("express");
const { addUser, getUserDetails, getSingleUser, updateUser, deleteUser } = require("../controller/userController");
const { authentication } = require("../controller/middleware/auth");
const router = express.Router();

// adding users
router.post("/addUser", authentication, addUser);

// getting user details for admin
router.get("/getUsersDetails", authentication, getUserDetails);

// get single user details to update
router.get("/getSingleUser/:userId", authentication, getSingleUser);

// update the user
router.put("/updateUser/:userId", authentication, updateUser);

// delete the user
router.delete("/deleteUser/:userId", authentication, deleteUser);

module.exports = router;