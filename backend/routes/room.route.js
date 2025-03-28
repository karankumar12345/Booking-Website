import express from "express";
import { deleteUser, getAllUser, getUser, login, register, UpdateUser } from "../controllers/auth.controller.js";

const roomRouter=express.Router();





roomRouter.post("/register",register);
roomRouter.post("/login",login)

roomRouter.put("/user/:id",UpdateUser);
roomRouter.delete("/user/:id",deleteUser)
roomRouter.get("/user/:id", getUser)
roomRouter.get("/users", getAllUser)
export default roomRouter









