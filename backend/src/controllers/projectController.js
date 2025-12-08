import Project from "../models/Project.js";
import { Task } from "../models/Task.js";
import { isOwner } from "./helpers/isOwner.js";

// create
export async function handleCreateProject(req, res) {
  try {
    const { title, description } = req.body;
    //des - optional

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      owner: req.user.id,
    });

    return res.status(200).json({ msg: "project created successfully ","project":project });
  } catch (err) {
    console.error("create project error", err);
    return res.status(500).json({ msg: "internal server error" });
  }
}

// get all 
export async function handleGetAllProjects(req, res) {
  try {

    // only the project users - members/owner can view the list 
    const projects =  await Project.find( {
     $or : [
        {owner: req.user.id } // current user
        , {"members.user": req.user.id}
      ]
    }).populate("tasks").lean()
    
    // lean() - returns plain js obj
    //attaching tasks - belonging to each project
    for ( let p of projects){
      const tasks = await Task.find({project: p._id}).lean()
      p.tasks = tasks
    }

    console.log("all projects : ", projects)
    res
      .status(200)
      .json({ msg: "all projects are:-", projects: projects });
  } catch (err) {
    console.error("error fetching all projects ", err);
    return res.status(500).json({ msg: "internal server error" });
  }
}

// delete proj
export async function handleDeleteProject(req, res) {
  try {
    const projectId = req.params.projectId;

    var project = await Project.findById(projectId);
    if (!isOwner(project, req.user.id)) {
      return res
        .status(403)
        .json({
          msg: "unauthorized access , only project Owner can delete projects",
        });
    }
    //checking if project exists
    
    project = await Project.findOneAndDelete({
      _id: projectId,
      owner: req.user.id,
    });
    
    if (!project) {
      res.status(404).json({ msg: "project not found" });
    }
    return res.status(200).json({ msg: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete Project Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}

// update
export async function handleUpdateProject(req, res) {
  try {
    const projectId = req.params.projectId;

    const { title, description } = req.body;

    var project = await Project.findById(projectId)
    if ( !isOwner(project, req.user.id)){
      return res.status(403).json({ msg: "unauthorized access , only project Owner can update projects" });
    }

    project = await Project.findOneAndUpdate(
      { _id: projectId, owner: req.user.id }, //filter
      { title, description }, //updated val
      { new: true } 
    );

    if (!project) {
      return res
        .status(404)
        .json({ msg: "Project not found" });
    }

    res.status(200).json({msg: "project updated succesfully !!", project: project})

  } catch (err) {
    console.error("Update Project Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}
