const jwt = require('jsonwebtoken');
const tokenblacklistModel=require('../models/blacklist.model');

async function authUser(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    
     const istokenBlacklisted= await tokenblacklistModel.findOne({token});

     if(istokenBlacklisted){
       return res.status(401).json({message:"Token is blacklisted,please login first"});
     }
     

    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }
     
}

module.exports= {authUser};