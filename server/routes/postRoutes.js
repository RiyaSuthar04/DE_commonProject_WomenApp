import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {getFeedPost,getPostById,createPost,deletePost,createComment,likePost} from "../controllers/postController.js";

const router = express.Router();

router.get("/",protectRoute,getFeedPost);
router.get("/:id",protectRoute,getPostById);
router.post("/create",protectRoute,createPost);
router.delete("/delete/:id",protectRoute,deletePost);
router.post("/:id/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);


export default router;