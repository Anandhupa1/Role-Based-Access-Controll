const router = require("express").Router();


router.get("/",async(req,res,next)=>{
    try{
        res.render("index")
    }catch(err){console.log("error in index router",err)}
})
router.get("/documentation",async(req,res,next)=>{
    try{
        res.render("documentation")
    }catch(err){console.log("error in index router",err)}
})


module.exports=router;