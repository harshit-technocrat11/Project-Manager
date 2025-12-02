import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const authMiddleware= (req,res,next) =>{
    const authHeader = req.headers.authorization;

    // if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg: "Authorization denied!  token doesn't exist"})
    }

    const token  = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        //storing in req
        req.user = decoded;

        console.log("logged in : ", req.user)
        next ();
    }
    catch (err) {
        console.error(err)
        return res.status(401).json({msg: "invalid / expired token"})
    }

}