import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendWelcomeEmail} from "../emails/emailHandler.js";

export const signup = async(req,res)=>{
    try{

        const {name,username,email,password} = req.body;

        if(!name || !username || !email || !password){
            return res.status(400).json({message:"all fields are required"});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:"email already exists"});
        }

        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({message:"Username already exists"});
        }

        if(password.length <6){
            return res.status(400).json({message:"password must be atleast 6 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const user = new User({
            name,
            email,
            password:hashPassword,
            username
        });

        await user.save();

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});
        res.cookie("jwt-womenApp",token,{
            httpOnly:true,
            maxAge: 3*24*60*60*1000,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
        })

        res.status(201).json({message:"user registerd successfully"});
        const profileUrl = process.env.CLIENT_URL+"/profile/"+user.username;

        try{
            await sendWelcomeEmail(user.email,user.name,profileUrl);
        }catch(err){
            console.log("error sending welcome email",err.message);
        }

    }catch(err){
        console.log("error in signup: ",err.message);
        res.status(500).json({message:"internal servar error"});
    }
}

export const login = async(req,res)=>{
    try{
        const {username,password} = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message:"invalid username"});
        } 

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid password"});
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});
        res.cookie("jwt-womenApp",token,{
            httpOnly:true,
            maxAge: 3*24*60*60*1000,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
        });

        res.json({message:"loggedin successfully"});

    }catch(err){
        console.log("error in login: ",err.message);
        res.status(500).json({message:"internal servar error"});
    }
}

export const logout = (req,res)=>{
    res.clearCookie("jwt-womenApp");
    res.json({message:"logged out successfully"});
}

export const getCurrentUser = async(req,res)=>{
    try{
        res.json(req.user);
    }catch(err){
        console.err("error in getCurrentUser controller",err);
        res.status(500).json({message:"server error"});
    }
}