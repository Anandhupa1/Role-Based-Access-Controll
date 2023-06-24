const { UserModel } = require("../models/user.model");
const { ensureAuthenticated } = require("../utils/rbac");

const router = require("express").Router();

// router.get("/",async(req,res)=>{
//     try {
//         res.render("admin")
//     } catch (error) {
//         console.log("error in admin get",)
//     }
// })

router.get("/profile",ensureAuthenticated,async(req,res,next)=>{
    try{
        res.render("profile")
    }catch(err){console.log("error in index router",err)}
})



module.exports=router;