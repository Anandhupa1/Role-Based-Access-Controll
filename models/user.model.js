const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {roles} =require("../utils/constants");
require("dotenv").config();

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:"https://media.istockphoto.com/vectors/profile-icon-male-avatar-portrait-casual-person-vector-id530829125?k=6&m=530829125&s=612x612&w=0&h=Z76VH4c_W2aJ6UdUnjuCtLssjlFVNwNEns5VVNpH1Mg="},
    role :{type:String,
          default : roles.user,
          enum : [roles.admin,roles.user,roles.moderator]
        }
},{versionKey:false,timestamps:true})


userSchema.pre('save',async function(next){
    try{
    if(this.isNew){
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(this.password,salt);
     this.password = hashedPassword;
     if(this.email == process.env.adminEmail.toLowerCase()){
        this.role = roles.admin ;
     }
    }
    next()
    }catch(err){console.log("error in password hashing__________");next(err)}
})








const UserModel = mongoose.model("user",userSchema);

module.exports={UserModel};