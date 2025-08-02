import { json } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const AuthCheck = (req , res , next) =>{
  try {
  const token = req.headers.authorization.split(" ")[1]

  const isVarified = jwt.verify(token , process.env.SECRET_KEY)
   
  if(isVarified){
        req.user = isVarified
       return next()
  }else{
      return res.ststus(401).json({
        status:false,
        message : "Authorization Error"
      })
  }    
  } catch (error) {
    res.status(403).json({
        status:false,
        message : error.message
      })
  }
}

export default AuthCheck