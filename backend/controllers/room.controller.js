import hotelModel from "../models/hotel.model.js";
import roomModel from "../models/room.model.js";




export const CreateRoom=async (req,res,next)=>{
    try {

        const hotelId=req.params.hotelid;
        const newRoom=new roomModel(req.body);
        const savedRoom=await newRoom.save();
      const hotelname=  await hotelModel.findByIdAndUpdate(hotelId,{
            $push:{rooms:savedRoom._id}
        })
        res.status(200).json({
            success:true,
            message:`Room saved successfully in  ${hotelname.name}`
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
  
}
export const updateRoom=async (req,res,next)=>{
  try {

       const updatedRoom = await roomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success:true,
      updatedRoom
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
  })
  }
}
export const updateRoomAvailability=async(req,res,next)=>{
    try {
        await roomModel.updateOne({
            "roomNumbers._id":"req.params.id"
        },
        {
        $push:{
            "roomNumbers.$.unavailableDates": req.body.dates

        }
    }
    )
    res.status(200).json("Room status has been Updated")
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await roomModel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        res.status(404).json({
            success:false,
            message:err.message
         })
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
         })
    }
  };
  export const getRoom = async (req, res, next) => {
    try {
      const room = await roomModel.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
         })
    }
  };
  export const getRooms = async (req, res, next) => {
    try {
      const rooms = await roomModel.find();
      res.status(200).json(rooms);
    } catch (err) {
     res.status(500).json({
        success:false,
        message:err.message
     })
    }
  };