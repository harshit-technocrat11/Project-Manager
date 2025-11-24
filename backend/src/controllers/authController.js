import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { generatetoken } from "../utils/generateToken.js";

// register 
export  async function registerUser(req,res) {
    try{
        const {name, email , password} = req.body;

        if ( !name || !email || !password){
            return res.status(400).json({msg: 
                "all fields are required !!"
            })
        }

        //checking if user already exists 
        const userExists = await User.findOne({email})
        
        if ( userExists) {
            return res.status(401).json({msg: "user having this email-id already exists !"})
        }

        // hash  password
        const hashedPassword = await bcrypt.hash(password,10);

        //creating user 
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        }) 

        //creating jwt token 
        const token = generatetoken(user._id, email);

        return res.json({msg: "User Registration successful!", 
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }, 
            jwt: token
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({msg: "internal server error"})
    }
}


//login 
export  async function loginUser(req,res) {
    try{
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({msg: "All field are required"})
        }

        // if user exists
        const user = await User.findOne({email});
        if ( !user){
           return res.status(401).json({msg: "invalid credentials"})
        }

        //user.password = hashed pass

        if (! bcrypt.compare(password, user.password)){
            return res.status(401).json({msg:"incorrect password"})
        }

         //creating jwt token 
        const token = generatetoken(user._id, email);

        return res.json({
            msg: "Login successful!",
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            },
            jwt: token
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({msg: "internal server error"})
    }
}

//for user info
export  async function userDetails(req,res) {
    try{
        //access userIdfrom AUTH m/w
        const user = await User.findById(req.user.id)

        if (!user){
            return res.status(400).json({msg:"failed to get the user data"})
        }
        
        return res.status(200).json({user})

    }
    catch(err){
         console.error(err)
        return res.status(500).json({msg: "internal server error"})
    }
}