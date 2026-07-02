const express= require('express');
const {authmodel,Blacklist} = require('../models/auth'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



/**
 * @desc Register a new user
 * @route POST /register
 * @access Public
 */
async function registerData(req,res){
   const {email,password}=req.body;
   const emailExist= await authmodel.findOne({email});
   if(emailExist){
    return res.status(400).json({message:"Email already exists"});
   }
    const hashedPassword = await bcrypt.hash(password,10);

const newUser = await authmodel.create({
    email,
    password: hashedPassword
});
const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie('token', token, {httpOnly:true, maxAge:3600000});
    
   
    res.status(201).json({message:"User created successfully", token});
}

/**
 * @desc Login a user
 * @route POST /login
 * @access Public
 */
 async function loginData(req, res) {
    const { email, password } = req.body;
 console.log(req.body);
    const user = await authmodel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 3600000,
    });

    res.status(200).json({
    message: "Login successful",
    user: {
        _id: user._id,
        username: user.username,
        email: user.email
    }
});
}
/**
 * @desc Logout a user
 * @route POST /logout  
 * @access Public
 */
async function logoutData(req,res){ 
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({message:"No token found"});
    }  
    const blacklistedToken = await Blacklist.findOne({ token });
    if (blacklistedToken) {
        return res.status(400).json({ message: "Token already blacklisted" });
    }
  res.clearCookie("token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
});


res.status(200).json({ message: "Logged out successfully" });
}   

 /**
 * @desc Get user data
 * @route GET /me   
 **/
async function getUserData(req, res) {
    console.log("req.user:", req.user);

    const user = await authmodel.findById(req.user.id).select("-password");;

    console.log("user:", user);

    res.json(user);
}


module.exports={
    registerData,
    loginData,
    logoutData,
    getUserData
};