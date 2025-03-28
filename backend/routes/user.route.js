import express from "express";
import { deleteUser, getAllUser, getUser, login, register, UpdateUser } from "../controllers/auth.controller.js";

const userRouter=express.Router();





userRouter.post("/register",register);
userRouter.post("/login",login)

userRouter.put("/user/:id",UpdateUser);
userRouter.delete("/user/:id",deleteUser)
userRouter.get("/user/:id", getUser)
userRouter.get("/users", getAllUser)
export default userRouter









