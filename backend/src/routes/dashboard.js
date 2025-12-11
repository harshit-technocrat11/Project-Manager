import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getDashboardStats,getOverdueTasks } from "../controllers/dashboardController.js";

const DashRouter  = Router();


DashRouter.get("/dashboard/stats", authMiddleware, getDashboardStats);
DashRouter.get("/dashboard/overdue", authMiddleware, getOverdueTasks);


export default DashRouter