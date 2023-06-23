const { UserModel } = require("../models/user.model");
const { roles } = require("../utils/constants");
const { ensureAdmin, ensureAuthenticated } = require("../utils/rbac");

const router = require("express").Router();




router.get("/allusers",ensureAuthenticated,ensureAdmin,async(req,res,next)=>{
    try {
        let users = await UserModel.find();
        res.render("userlist",{users})
    } catch (error) {
        console.log(error);next(error)
    }
})

router.get("/user/:id",async(req,res,next)=>{
    try {
         let user = await UserModel.findById(req.params.id);
        res.render("profile",{user,adminView:true})
    } catch (err) {
        next(err)
    }
})



// update role -- only for admin 

router.post("/update-role",async(req,res,next)=>{
    try {
        res.redirect("/")
    } catch (error) {
        next(error)
    }
})




module.exports=router;