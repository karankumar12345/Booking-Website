


import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";


export const register=async(req,res,next)=>{
    try {
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);

        const newUser=new userModel({
            ...req.body,
            password:hash
        })
        await newUser.save();

        res.status(200).json({
            success:true,
            message:"User has been created"
        })
        
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       })
        
    }
}
export const login=async(req,res,next)=>{
    try {
        const user=await userModel.findOne({username:req.body.username});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
            const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
            if(!isPasswordCorrect){
                return res.status(400).json({
                    success:false,
                    message:"Wrong password or username"
                })
            }
                const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},
                    process.env.SECRET_KEY
                )
                const { password, isAdmin, ...otherDetails } = user._doc;
                res
                  .cookie("access_token", token, {
                    httpOnly: true,
                  })
                  .status(200)
                  .json({ details: { ...otherDetails }, isAdmin,token });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

export const UpdateUser=async(req,res,next)=>{
    try {
        const updateUser=await userModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json({
            success:true,
            message:"User has been updated",
            updateUser
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

export const deleteUser=async(req,res,next)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"User has been deleted"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
export const getUser=async(req, res, next)=>{
    try {
        const user=await userModel.findById(req.params.id);
        res.status(200).json({
            success:true,
            message:"User has been found",
            user
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}
export const getAllUser=async(req, res, next)=>{
    try {
        const users=await userModel.find();
        res.status(200).json({
            success:true,
            message:"Users has been found",
            users
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}
