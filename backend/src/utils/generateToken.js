import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const secret_key = process.env.JWT_KEY

export const  generatetoken  = (userId,email) =>{
    const payload = {id: userId, email: email}

    return jwt.sign(payload, secret_key, {expiresIn:"7d"})

}