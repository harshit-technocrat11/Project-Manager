import {Router} from "express"
import {registerUser, loginUser, userDetails} from "../controllers/authController.js"

import { authMiddleware } from "../middlewares/authMiddleware.js";


const UserRouter = Router();


//Private route
UserRouter.get("/user-details", authMiddleware, userDetails)


//public route
UserRouter.post("/login", loginUser);
UserRouter.post("/register", registerUser);

export default UserRouter;