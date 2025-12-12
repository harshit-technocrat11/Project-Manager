import bcrypt from "bcryptjs"

import User from "../models/User.js"
import { generatetoken } from "../utils/generateToken.js";
import Project from "../models/Project.js";

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

        //fresh signedup user --> add to project members list 

        // when a new user has registered---> after cliking the invitation --> then update the user to have user: userId
        await Project.updateMany(
            // filter
           {
            "members.email": email,
             "members.user": null
           },
           {
            $set : {"members.$.user" : user._id} //userId set
           }

        )

        //creating jwt token 
        const token = generatetoken(user._id, email,user.name);

        console.log("user registration successful, user: ",user)
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

        const result =await bcrypt.compare(password, user.password)
        
        if (!result) {
          return res.status(401).json({ msg: "incorrect password" });
        }

         //creating jwt token 
        const token = generatetoken(user._id, email, user.name);

        console.log("user login successful, user:",user)
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