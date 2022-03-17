const mongoose = require('mongoose');
// const validator = require('validator');
const opts = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  };

var userSchema = new mongoose.Schema(
    {
firstName:{
    type:String,
    required:true
},
lastName:{
    type:String
},
email:{
    type:String,
    required:true,
   unique:true
},
dob:{
    type:Date
},
password:{
    type:String,
    required:true
},
isDeleted:{
    type:Boolean,
    default:false
}
 },opts)

 const userDetails = mongoose.model('userscoll',userSchema); //collection name here
 module.exports={userDetails}