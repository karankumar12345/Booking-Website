import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";

dotenv.config();
const PORT=process.env.PORT  || 8000


const app=express();

app.use(cors())
app.use(cookieParser())

//db connection 

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
        
    } catch (error) {
        throw error;
        
    }
}
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
app.use(express.json());
app.use("/api/auth",userRouter)
mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected")
}
)

app.listen(PORT,()=>{
    connect()
    console.log(`Server is running on port ${PORT}`)
})