const router = require("express").Router();


router.get("/profile",async(req,res,next)=>{
    try{
        res.send("user router")
    }catch(err){console.log("error in index router",err)}
})


module.exports=router;