import express from "express";
import AuthCheck from "../MiddleWares/AuthMiddleware.js";
import dummy from "../Controllers/dummController.js";

const dummyRouter = express.Router()

dummyRouter.post("/post" , AuthCheck , dummy)

export default dummyRouter