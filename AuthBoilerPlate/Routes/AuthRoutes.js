import express from "express";
import { Router } from "express";
import { logInController, signUpController } from "../Controllers/authControllers.js";

const authRouter = express.Router()

authRouter.post("/signup", signUpController)
authRouter.post("/login", logInController)

export default authRouter
