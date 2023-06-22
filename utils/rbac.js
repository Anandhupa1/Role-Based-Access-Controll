const {roles} =require("../utils/constants")
function ensureAuthenticated (req,res,next){
    if(!req.session.user){
        res.redirect("/auth/login")
    }else{
        next();
    }
}

function ensureAdmin(req,res,next){
    if (req.session.user.role !== roles.admin){
        
        res.redirect("/");
       
    }else{
        next();
    }
}


module.exports={ensureAdmin,ensureAuthenticated}