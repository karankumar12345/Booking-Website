import express from "express";
import { deleteUser, getAllUser, getUser, login, register, UpdateUser } from "../controllers/auth.controller.js";

const hotelRouter=express.Router();





hotelRouter.post("/register",register);
hotelRouter.post("/login",login)

hotelRouter.put("/user/:id",UpdateUser);
hotelRouter.delete("/user/:id",deleteUser)
hotelRouter.get("/user/:id", getUser)
hotelRouter.get("/users", getAllUser)
export default hotelRouter












