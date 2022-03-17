var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const {userDetails} = require('../mongooseSchema');
const {encryptedPassword} = require('../crypt');

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URL)

//get all users
router.get("/",async(request,response)=>{
  try {

    //use of lean - skips instantiating a full Mongoose document and just give you the plain  object
  const userData = await userDetails.find({ isDeleted: false},{firstName:1,lastName:1,email:1,dob:1}).lean();
  if(userData.length>0)
  response.json({
      statusCode:200,
      users:userData
  })
  else{
      response.json({
          statusCode:404,
          message:"No data Found"
      }) 
  }
}
catch(error){
  console.log(error)
  response.json({
      statusCode:500,
      message:"Internal Server Error"
  }) 
}
})

//get a particular user with id
router.get("/:id",async(request,response)=>{
  try {
      const userData = await userDetails.findOne({_id:ObjectId(request.params.id) ,isDeleted: false},{firstName:1,lastName:1,email:1,dob:1}).lean();
      if(userData)
      response.json({
          statusCode:200,
          users:userData
      })
      else{
          response.json({
              statusCode:404,
              message:"No User Found with this id"
          }) 
      }
  }
  catch(error){
      console.log(error)
      response.json({
          statusCode:500,
          message:"Internal Server Error"
      }) 
  }})

//update the user Detail (firstName,LastName,DOB,)
router.patch("/:id", async(request,response)=>{
  try {
    const userData = await userDetails.find({_id:ObjectId(request.params.id),isDeleted:false}).lean();
    if(userData.length>0){
      let {
        firstName=userData.firstName,
        lastName=userData.lastName,
        dob=userData.dob} = request.body;

      await userDetails.findOneAndUpdate({_id:ObjectId(request.params.id)},
       { $set: { firstName: firstName,lastName:lastName,email:email,dob:dob }},{timestamps:{createdAt:false, updatedAt:true}})
    response.json({
        statusCode:200,
        message:"Userdetails updated successfully!"
    })
  }
    else{
        response.json({
            statusCode:404,
            message:"No data Found"
        }) 
    }
  }
  catch(error){
    console.log(error)
    response.json({
        statusCode:500,
        message:"Internal Server Error"
    })
  }}) 
  
  //delete a user with id
router.delete("/:id", async(request,response)=>{
  try {
    const userData = await userDetails.find({_id:ObjectId(request.params.id)}).lean();
    if(userData.length>0){
      await userDetails.findOneAndUpdate({_id:ObjectId(request.params.id)},
       { $set: { isDeleted: true }},{timestamps:{createdAt:false, updatedAt:true}})
    response.json({
        statusCode:200,
        message:"User deleted successfully!"
    })
  }
    else{
        response.json({
            statusCode:404,
            message:"No data Found"
        }) 
    }
  }
  catch(error){
    console.log(error)
    response.json({
        statusCode:500,
        message:"Internal Server Error"
    }) 
  }})

  //add a new user
router.post("/",async(req,response)=>{
  try{
      let {firstName,lastName,email,dob,password} = req.body;
      const encrytPassword = await encryptedPassword(password);
   await userDetails.create({firstName,lastName,email,dob,password:encrytPassword});
  response.json({
      statusCode:200,
      message:"User Added"
  })   
}
  catch(error){
      console.log(error)
      response.json({
          statusCode:500,
          message:"Internal Server Error"
      }) 
  }})

  //bad request handle
router.get("*",async(req,response)=>{
    response.json({
      statusCode:400,
      message:"Bad Request"
  })})
router.post("*",async(req,response)=>{
    response.json({
      statusCode:400,
      message:"Bad Request"
  })})
router.put("*",async(req,response)=>{
    response.json({
      statusCode:400,
      message:"Bad Request"
  })})
router.delete("*",async(req,response)=>{
    response.json({
      statusCode:400,
      message:"Bad Request"
  })})
router.patch("*",async(req,response)=>{
    response.json({
      statusCode:400,
      message:"Bad Request"
  })})

module.exports = router;
