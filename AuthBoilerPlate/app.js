import express from "express";
import authRouter from "./Routes/AuthRoutes.js";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors"


const app =express()


dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const URI =process.env.URI
const PORT =process.env.PORT || 4000

mongoose.connect(URI)
.then(()=>console.log("Connected"))
.catch(()=>console.log("Connection Error"))



app.use("/api/auth" , authRouter)




app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);   
})