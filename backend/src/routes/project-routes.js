import { Router } from "express";

import {handleCreateProject, handleDeleteProject, handleUpdateProject, handleGetAllProjects} from "../controllers/projectController.js"

import { authMiddleware } from "../middlewares/authMiddleware.js";
const projectRouter = Router();


// all routes are protected- only auth users can DO CRUD ops
projectRouter
  .use("/", authMiddleware)

  .post("/", handleCreateProject)

  .get("/", handleGetAllProjects)

  .patch("/:projectId", handleUpdateProject)

  .delete("/:projectId", handleDeleteProject);

export default projectRouter;