import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";

dotenv.config();

const app = express();
app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/posts",postRoutes);
app.use("/api/v1/notifications",notificationRoutes);
app.use("api/v1/connections",connectionRoutes);

app.listen(PORT, ()=> {
    console.log("server running on port 5000")
    connectDB();
});
