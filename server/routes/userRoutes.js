import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {getsuggestedConnection,getPublicProfile,updateProfile} from "../controllers/userController.js"
const router = express.Router();

router.get("/suggestions",protectRoute,getsuggestedConnection);
router.get("/:username",protectRoute,getPublicProfile);
router.put("/profile",protectRoute,updateProfile);


export default router;