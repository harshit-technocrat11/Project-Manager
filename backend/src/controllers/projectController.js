import Project from "../models/Project.js";

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

    return res.status(200).json({ msg: "project created successfully " });
  } catch (err) {
    console.error("create project error", err);
    return res.status(500).json({ msg: "internal server error" });
  }
}

// get all 
export async function handleGetAllProjects(req, res) {
  try {
    const projects = await Project.find();

    res.status(200).json({ msg: "all projects are:-", projects: projects });
  } catch (err) {
    console.error("error fetching all projects ", err);
    return res.status(500).json({ msg: "internal server error" });
  }
}

// delete proj
export async function handleDeleteProject(req, res) {
  try {
    const projectId = req.params.projectId;

    //checking if project exists
    const project = await Project.findOneAndDelete({
      _id: projectId,
      owner: req.user.id,
    });

    if (!project) {
      res.status(404).json({ msg: "project not found or unauthorized" });
    }
    return res.status(200).json({ msg: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete Project Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}

// UPDATE
export async function handleUpdateProject(req, res) {
  try {
    const projectId = req.params.projectId;

    const { title, description } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: projectId, owner: req.user.id }, //filter
      { title, description }, //updated val
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ msg: "Project not found or unauthorized" });
    }

  } catch (err) {
    console.error("Update Project Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}
