import hotelModel from "../models/hotel.model";
import roomModel from "../models/room.model";

export const CreateHotel = async (req, res, next) => {
  try {
    const newHotel = new hotelModel(req.body);
    const saveHotel = await newHotel.save();
    res.status(200).json({
      success: true,
      message: "Created Hotel succesfully",
      saveHotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
export const DeleteHotel = async (req, res, next) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    re.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json({
      success: false,
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.split(",");
    const list = await Promise.all(
      cities.map((city) => {
        return hotelModel.countDocuments({ city: city });
      })
    );
    res.status(200).json({
      success: true,
      list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const CountByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelModel.countDocuments({ type: "resort" });
    const villaCount = await hotelModel.countDocuments({ type: "villa" });
    const cabinCount = await hotelModel.countDocuments({ type: "cabin" });
    res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getHotelRooms=async(req,res,next)=>{
    try {
        const hotel=await hotelModel.findById(req.params.id);
        const list =await Promise.all(
            hotel.rooms.map((room)=>{
                return roomModel.findById(room)
            })
        )
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}