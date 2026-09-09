const userModel=require('../models/user.model'); 
const tokenblacklistModel=require('../models/blacklist.model');
const authMiddleware=require('../middlewares/auth.middleware');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');




/** 
 * @name loginController
 * @description Controller to handle user login
 * @route POST /api/auth/login
 * @access Public
 */
async function loginController(req,res){

    const {email,password}=req.body;


    const user= await userModel.findOne({email:email});
    if(!user){
        return res.status(400).json({message:"incorrect email"});
    }
    const isPasswordMatch= await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:"incorrect password"});
    }   
    
    
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
    return res.status(200).json({message:"User logged in successfully",token});

}




/** 
 * @name registerUserController
 * @description Controller to handle user registration
 * @route POST /api/auth/register
 * @access Public
 */

async function registerUserController(req,res){
    const {email,username,password}=req.body;
    if(!email || !username || !password){
        return res.status(400).json({message:"All fields are required"});
    } 
    const isUserExist= await userModel.findOne({
        $or:[
            {email:email},
            {username:username}     
        ]
    });
    if(isUserExist){
        return res.status(400).json({message:"User already exists"});
    }
    const hash=await bcrypt.hash(password,10);

    const user= await userModel.create({
        email:email,
        username:username,
        password:hash
    }); 

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
    return res.status(201).json({message : "User registered successfully", token,
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    });
}





/**
 * @name logoutController
 * @description Controller to handle user logout
 * @route GET /api/auth/logout
 * @access Private
 */

async function logoutController(req,res){
    const token=req.cookies?.token;
    if(token){
        await tokenblacklistModel.updateOne(
            {token},
            {$setOnInsert:{token}},
            {upsert:true}
        );
    }
    res.clearCookie('token', {httpOnly:true});
    return res.status(200).json({message:"User logged out successfully"});
}





/**
 * @name getMeController
 * @description Controller to fetch current user's details
 * @route GET /api/auth/me
 * @access Private
 */
async function getMeController(req,res){

    const user=await userModel.findById(req.user.id);

    return res.status(200).json({
        message:"User fetched successfully",
        user:{
        id:user._id,
        email:user.email,
        username:user.username
        }
    });
}






module.exports= {registerUserController, loginController, logoutController, getMeController};