import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(`failed to connect to mongo: ${err.message}`);
        process.exit(1);
    }
}