import express from "express";
import uploadImageController from "../Controllers/UploadImageControllers.js";




const uploadRouter =express.Router()

uploadRouter.post('/upload' , uploadImageController)

export default uploadRouter