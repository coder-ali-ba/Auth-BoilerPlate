import { json } from "express";
import AuthModel from "../models/AuthenticationModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import { welcomeTemplate } from "../Templates/welComeTemplate.js";

const signUpController = async(req , res)=>{
    try {
         const {email , password }= req.body;
         const ifExist = await AuthModel.findOne({email})
          
          
         if(ifExist){
            return res.json({
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




         res.json({
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

export {
    signUpController
}