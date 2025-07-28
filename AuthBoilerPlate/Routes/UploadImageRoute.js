import express from "express";
import upload from "../MiddleWares/MulterMiddware.js";
import uploadImageController from "../Controllers/UploadImageControllers.js";
const uploadRouter = express.Router()

uploadRouter.post('/upload' , upload.any('image') , uploadImageController)

export default uploadRouter