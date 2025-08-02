import { json } from "express";
import AuthModel from "../models/AuthenticationModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import { welcomeTemplate } from "../Templates/welComeTemplate.js";
import jwt from "jsonwebtoken"

const signUpController = async(req , res)=>{
    try {
         const {email , password }= req.body;
         const ifExist = await AuthModel.findOne({email})
          
          
         if(ifExist){
            return res.status(409).json({
                message : "user Already Exist"
            })
         }
         const hashPassword = await bcrypt.hash(password , 10)
         const Obj = {
            ...req.body,
            password : hashPassword
         }
         const data =await AuthModel.create(Obj)

         const otp = Math.floor(100000 + Math.random() * 900000);

         const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSKEY,
            },
         });

         const mailOptions = {
            from: process.env.EMAIL,
            to:Obj.email,
            subject: "User Signup",
            html: welcomeTemplate(Obj)
        };

        const userEmail = await transporter.sendMail(mailOptions)




         res.status(200).json({
            message : "Signed Up Successfully",
            data : data
         })
    } catch (error) {
        res.json({
            message: error.message,
            data : null
        })
    }    
}


const logInController =async(req , res) => {
    try {
        const body = req.body
        const {email , password} =body
        const checkEmail =await AuthModel.findOne({email})
        
        
        if(!checkEmail){
          return res.status(401).json({
            message : "invalid email "
           })
        }

        const checkPass =await bcrypt.compare(password , checkEmail.password)
        if(!checkPass){
          return res.status(401).json({
            message : "invalid  password"
           })
        }
        
         const token =  jwt.sign({ id: checkEmail._id } , process.env.SECRET_KEY)

        res.status(200).json({
          message : "Got APi",
          token : token,
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
    
}

export {
    signUpController,
    logInController
}