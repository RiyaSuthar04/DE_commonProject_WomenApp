import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    headline:{
        type:String,
        default:"user",
    },
    location:{
        type:String,
        default:"earth",
    },
    about:{
        type:String,
        default:"",
    },
    skills:[String],
    experience:[
        {
        title:String,
        company:String,
        startDate:Date,
        endDate:Date,
        description:String,
        },
    ],
    education:[
        {
        school:String,
        fieldofstudy:String,
        startYear:String,
        endYear:String,
        },
    ],
    connection:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
});

const User = mongoose.model("User",userSchema);
export default User;