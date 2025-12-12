import express, { urlencoded } from "express"
import cors from "cors"
import UserRouter from "./routes/auth.js";


import dotenv from "dotenv"
import projectRouter from "./routes/project-routes.js";
import MemberRouter from "./routes/member-routes.js";
import TaskRouter from "./routes/task-routes.js";
import DashRouter from "./routes/dashboard.js";
dotenv.config();

const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const allowedOrigins = [
  "http://localhost:5173",
  "https://prjt-manager.netlify.app"
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


// routes
app.get("/", (req,res)=>{
    res.json({message: "API running"})
})

app.use("/api/", UserRouter);
app.use("/api", DashRouter)

app.use("/api/projects", projectRouter)

app.use("/api/members", MemberRouter)

app.use("/api/tasks", TaskRouter)

export default app;