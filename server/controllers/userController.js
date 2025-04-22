import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getsuggestedConnection = async(req,res)=>{

    try{

        const currentUser = await User.findById(req.user._id).select("connection");
        
        //find users who are not alredy connected and recommened on our profile
        const suggestedUser =  await User.find({
            _id:{
                $ne:req.user._id,
                $nin:currentUser.connection,
            },
        }).select("name username profilePicture headline").limit(5);

        res.json(suggestedUser);

    }catch(err){
        console.log("error in suggesting controller ",err);
        res.status(500).json({message:"server error"});
    }

};

export const getPublicProfile = async(req,res)=>{
    try{

        const user = await User.findOne({username:req.params.username}).select("-password");
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        res.json(user);

    }catch(err){
        console.log("error in geting publicprofile controller ",err);
        res.status(500).json({message:"server error"});
    }
};

export const updateProfile = async(req,res)=>{

    try{

        const allowedFields = [
            "name",
            "username",
            "headline",
            "about",
            "location",
            "profilePicture",
            "skills",
            "experience",
            "education",
        ];

        const updatedData = {};
        for(const field of allowedFields){
            if(req.body[field]){
                updatedData[field]=req.body[field];
            }
        }

        if(req.body.profilePicture){
            const result = await cloudinary.uploader.upload(req.body.profilePicture);
            updatedData.profilePicture = result.secure_url;
        }

        const user = await User.findByIdAndUpdate(req.user._id,{$set:updatedData},{new:true}).select("-password");
        res.json(user);

    }catch(err){
        console.log("error in updating profile controller ",err);
        res.status(500).json({message:"server error"});
    }

};