import express, { urlencoded } from "express"
import cors from "cors"
import UserRouter from "./routes/auth.js";
import { Router } from "express";



import dotenv from "dotenv"
import projectRouter from "./routes/project-routes.js";
dotenv.config();

const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// routes
app.get("/", (req,res)=>{
    res.json({message: "API running"})
})

app.use("/api/", UserRouter);

app.use("/api/projects", projectRouter)

export default app;