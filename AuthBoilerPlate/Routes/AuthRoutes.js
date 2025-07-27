import express from "express";
import { Router } from "express";
import { signUpController } from "../Controllers/authControllers.js";

const authRouter = express.Router()

authRouter.post("/signup", signUpController)

export default authRouter
