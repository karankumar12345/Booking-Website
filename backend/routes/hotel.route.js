import express from "express";
import { deleteUser, getAllUser, getUser, login, register, UpdateUser } from "../controllers/auth.controller.js";
import { verifyAdmin } from "../utils/Token.js";
import { CreateRoom, updateRoomAvailability } from "../controllers/room.controller.js";
import { countByCity, CountByType, DeleteHotel, getHotel, getHotelRooms, getHotels, UpdateHotel } from "../controllers/hotel.controller.js";

const hotelRouter=express.Router();

hotelRouter.post("/hotel/:hotelid",verifyAdmin,CreateRoom);
hotelRouter.post("/hotel/availability/:id",verifyAdmin,updateRoomAvailability)

hotelRouter.put("/hotel/:id",verifyAdmin,UpdateHotel);
hotelRouter.delete("/hotel/:id",verifyAdmin,DeleteHotel)
hotelRouter.get("/hotel/:id", getHotel)
hotelRouter.get("/hotels", getHotels)
hotelRouter.get("/countByCity", countByCity)
hotelRouter.get("/countByType", CountByType)
hotelRouter.get("/room/:id", getHotelRooms)


export default hotelRouter












