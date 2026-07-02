const express= require('express');
const {authmodel,Blacklist} = require('../models/auth'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

async function authMiddleware(req,res,next){
   console.log("Cookies:", req.cookies);
console.log("Headers:", req.headers.cookie);
    const token = req.cookies.token 
    
    if(!token){
        return res.status(401).json({message:"No token, authorization denied"});
    }
    const blacklisted = await Blacklist.findOne({ token });

if (blacklisted) {
    return res.status(401).json({ message: "Token has been revoked" });
}
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Token is not valid"});
    }}

    module.exports = authMiddleware;