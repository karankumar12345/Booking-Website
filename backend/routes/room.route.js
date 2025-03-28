import express from "express";
import { deleteUser, getAllUser, getUser, login, register, UpdateUser } from "../controllers/auth.controller.js";
import { verifyAdmin } from "../utils/Token.js";
import { CreateRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.controller.js";

const roomRouter=express.Router();





roomRouter.post("/room/:hotelid",verifyAdmin,CreateRoom);
roomRouter.put("/room/availability/:id",updateRoomAvailability)

roomRouter.put("/room/:id",verifyAdmin,updateRoom);
roomRouter.delete("/room/:id/:hotelid",verifyAdmin,deleteRoom)
roomRouter.get("/room/:id", getRoom)
roomRouter.get("/rooms", getRooms)
export default roomRouter









