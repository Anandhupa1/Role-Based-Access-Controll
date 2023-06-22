const { UserModel } = require("../models/user.model");
const { roles } = require("../utils/constants");
const { ensureAdmin, ensureAuthenticated } = require("../utils/rbac");

const router = require("express").Router();




router.get("/allusers",ensureAuthenticated,ensureAdmin,async(req,res,next)=>{
    try {
        let users = await UserModel.find();
        res.send(users)
    } catch (error) {
        console.log(error);next(error)
    }
})


module.exports=router;