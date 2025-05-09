import Post from "../models/post.js";
import Notification from "../models/notification.js";
import cloudinary from "../lib/cloudinary.js";

export const getFeedPost = async(req,res)=>{
    try{
        const posts = await Post.find({author:{$in:req.user.connection}})
        .populate("author","name username profilePicture headline")
        .populate("comments.user","name profilePicture")
        .sort({createdAt: -1});

        res.status(200).json(posts);
    }catch(err){
        console.log("error in gettingPost controller ",err);
        res.status(500).json({message:"server error"});
    }
};

export const createPost = async(req,res)=>{
    try{

       const {content,image} = req.body;
       let newPost;
       
       if(image){
        const imgResult = await cloudinary.uploader.upload(image);
        newPost = new Post({
            author:req.user._id,
            content,
            image:imgResult.secure_url
        });
       }else{
        newPost = new Post({
            author:req.user._id,
            content
        });
       }

       await newPost.save();
       res.status(201).json(newPost);

    }catch(err){
        console.log("error in uploadingPost controller ",err);
        res.status(500).json({message:"server error"});
    }
};

export const deletePost = async(req,res)=>{
    try{

        const postId = req.params.id;
        const userId = req.user._id;
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message:"post not fund"});
        }

        if(post.author.toString() !== userId.toString()){
            return res.status(403).json({message:"you are not authorized to delete this post"});
        }

        if(post.image){
            //will delete image from cloudinary
            await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0]);
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({message:"post deleted"});

    }catch(err){
        console.log("error in deletingPost controller ",err);
        res.status(500).json({message:"server error"});
    }
};

export const getPostById = async(req,res)=>{
    try{

        const postId = req.params.id;
        const post = await Post.findById(postId)
        .populate("author","name username profilePicture headline")
        .populate("comments.user","name profilePicture username headline");

        res.status(200).json(post);

    }catch(err){
        console.log("error in gettingPost byId controller ",err);
        res.status(500).json({message:"server error"});
    }
};

export const createComment = async (req, res) => {
	try {
		const postId = req.params.id;
		const { content } = req.body;

		const post = await Post.findByIdAndUpdate(
			postId,
			{
				$push: { comments: { user: req.user._id, content } },
			},
			{ new: true }
		).populate("author", "name email username headline profilePicture");

		// create a notification if the comment owner is not the post owner
		if (post.author._id.toString() !== req.user._id.toString()) {
			const newNotification = new Notification({
				recipient: post.author,
				type: "comment",
				relatedUser: req.user._id,
				relatedPost: postId,
			});

			await newNotification.save();

			try {
				const postUrl = process.env.CLIENT_URL + "/post/" + postId;
				await sendCommentNotificationEmail(
					post.author.email,
					post.author.name,
					req.user.name,
					postUrl,
					content
				);
			} catch (error) {
				console.log("Error in sending comment notification email:", error);
			}
		}

		res.status(200).json(post);
	} catch (error) {
		console.error("Error in createComment controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const likePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const post = await Post.findById(postId);
		const userId = req.user._id;

		if (post.likes.includes(userId)) {
			// unlike the post
			post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
		} else {
			// like the post
			post.likes.push(userId);
			// create a notification if the post owner is not the user who liked
			if (post.author.toString() !== userId.toString()) {
				const newNotification = new Notification({
					recipient: post.author,
					type: "like",
					relatedUser: userId,
					relatedPost: postId,
				});

				await newNotification.save();
			}
		}

		await post.save();

		res.status(200).json(post);
	} catch (error) {
		console.error("Error in likePost controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};