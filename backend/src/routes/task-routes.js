import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasks,
  editTask,
  deleteTask,
} from "../controllers/taskController.js";

const TaskRouter = Router();

// protection

TaskRouter.use(authMiddleware)

  .get("/:projectId", getTasks)

  .post("/:projectId", createTask)

  .patch("/edit/:taskId", editTask)

  .delete("/delete/:taskId",deleteTask)


  export default TaskRouter
