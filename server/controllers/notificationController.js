import Notification from "../models/notification.js";

export const getUserNotification = async(req,res)=>{
    try{
        const notifications = await Notification.find({recipient:req.user._id}).sort({createdAt: -1})
        .populate("relatedUser","name username profilePicture")
        .populate("relatedPost","content image");

        res.status(200).json(notifications);
    }catch(err){
        console.log("error in fetching notification controller",err);
        res.status(500).json({message:"internal server error"});
    }
};

export const markNotificationAsRead = async(req,res)=>{
    const notificationId = req.params.id;
    try{
        const notification = await Notification.findByIdAndUpdate(
            {_id:notificationId,recipient:req.user._id},
            {read:true},
            {new:true}
        );
        res.json(notification);
    }catch(err){
        console.log("error in mark readas notification controller",err);
        res.status(500).json({message:"internal server error"}); 
    }

};

export const deleteNotification = async(req,res)=>{
    const notificationId = req.params.id;
    try{
        await Notification.findOneAndDelete({
            _id:notificationId,
            recipient:req.user._id
        });

        res.json({message:"notification deleted.."});

    }catch(err){
        console.log("error in deleting notification controller",err);
        res.status(500).json({message:"internal server error"}); 
    }

};