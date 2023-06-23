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

router.post("/update-role",validate,async(req,res,next)=>{
    try {
     
      
        let out = await UserModel.findByIdAndUpdate(req.body.id, {role:req.body.role},{new:true});
        res.render("profile",{user:out,adminView:true});
       
    } catch (error) {
        next(error)
    }
})


async function validate (req,res,next){
    let users = await UserModel.find();
    
    if(!req.body.id || !req.body.role){
        req.flash("danger","please fill all the entries");
       
        const messages = req.flash();
        res.render("userlist",{users,messages})}
          
          else if(req.session.user.role!=="ADMIN"){
            req.flash("danger","As a user , you don't have access to change the role of users")
            const messages = req.flash();
            res.render("userlist",{users,messages})}
          else if(req.session.user._id===req.body.id){
            req.flash("danger","As an admin ,you are not allowed to update your own role , ask any other admin to change it!!")
            const messages = req.flash();
            res.render("userlist",{users,messages})
        }else {
            next()
        }

     
       
}

module.exports=router;