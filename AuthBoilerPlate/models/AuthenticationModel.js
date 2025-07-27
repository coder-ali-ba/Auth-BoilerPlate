import mongoose from "mongoose";

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
        type : Number,
        required : true
    }
})

const AuthModel = mongoose.model("AllUser" , AuthSchema)
export default AuthModel