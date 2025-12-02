import express, { urlencoded } from "express"
import cors from "cors"
import UserRouter from "./routes/auth.js";


import dotenv from "dotenv"
import projectRouter from "./routes/project-routes.js";
import MemberRouter from "./routes/member-routes.js";
import TaskRouter from "./routes/task-routes.js";
dotenv.config();

const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



// routes
app.get("/", (req,res)=>{
    res.json({message: "API running"})
})

app.use("/api/", UserRouter);

app.use("/api/projects", projectRouter)

app.use("/api/members", MemberRouter)

app.use("/api/tasks", TaskRouter)

export default app;