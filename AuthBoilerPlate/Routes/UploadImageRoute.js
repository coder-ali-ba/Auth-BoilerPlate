import express from 'express';
import upload from '../MiddleWares/multer.js';
import uploadImage from "../Controllers/UploadImageControllers.js"
const uploadRouter = express.Router();


uploadRouter.post('/upload', upload.single('image'), uploadImage);

export default uploadRouter