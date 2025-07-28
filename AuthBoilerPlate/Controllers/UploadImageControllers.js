import express from "express";
import { cloudinaryUploader } from "../Configs/CloudinaryConfig.js";
import fs from "fs"

const uploadImageController = async(req , res)=>{
    try {
       const filePath = req.files[0].path;
       if(!filePath){
         return res.json({
            message :"File not Found"
         })
       }
      
       const profilePC = await cloudinaryUploader.upload(filePath)
       fs.unlink(filePath , (error , res)=>{

       })
       res.json({
           message : " Got Image Uploader",
           data : profilePC.secure_url

        }) 
    } catch (error) {
        res.json({
            message:"something went wrong"
        })
    }
}

export default uploadImageController