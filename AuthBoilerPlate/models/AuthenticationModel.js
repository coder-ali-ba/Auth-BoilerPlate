import mongoose from "mongoose";
import { type } from "os";

const AuthSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    profileImage :{
       type : String
    }
})

const AuthModel = mongoose.model("AllUser" , AuthSchema)
export default AuthModel