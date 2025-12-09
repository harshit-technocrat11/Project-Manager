import { Task } from "../models/Task.js";
import Project from "../models/Project.js";
import { isOwner } from "./helpers/isOwner.js";
import { isProjectMember } from "./helpers/isProjectMember.js";

// create
export async function createTask(req, res) {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;
    const projectId = req.params.projectId;
    console.log("projectId:", projectId);

    // console.log(title)
    // console.log(description)
    // console.log(dueDate)
    // console.log(priority)
    // console.log(assignedTo)

    if (!title) {
      return res.status(400).json({ msg: "task 'title' - mandatory field!" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ msg: "no such project found!" });
    }

    const currentUserId = req.user.id;

    // only owners / members of a project can create tasks
    if (
      !(
        isOwner(project, currentUserId) ||
        isProjectMember(project, currentUserId)
      )
    ) {
      return res
        .status(403)
        .json({ msg: "only project - owner/members can Create Tasks" });
    }

    // assignment validation ->
    if (assignedTo) {
      if (!isProjectMember(project, currentUserId)) {
        return res.status(400).json({
          msg: "The assigned user must be a member of this project.",
        });
      }
      assignedTo = currentUserId;
    }
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      createdBy: currentUserId,
      assignedTo: assignedTo, //self assign
      project: projectId,
    });

    return res
      .status(201)
      .json({ msg: "task successfully created !", task: task });
  } catch (err) {
    console.log("error creating new task -", err);
    return res
      .status(500)
      .json({ msg: "internal server error, creating new task" });
  }
}

export async function editTask(req, res) {
  try {
    const taskId = req.params.taskId;
    const currentUserId = req.user.id;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    //owners + task creators can edit the tasks only ,
    if (
      !isOwner(project, currentUserId) &&
      isProjectMember(project, currentUserId)
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    //valid project user

    if (req.body.assignedTo) {
      const assignedTo = req.body.assignedTo;

      if (!isProjectMember(project, assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be a project user" });
      }
    }

    console.log("update: ", req.body);
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );

    // updating completion status of project / wrt to tasks completed
    const projectId = updatedTask.project;

    const allTasks = await Task.find({ project: projectId });

    const allCompleted = allTasks.every((t) => t.status === "completed");

    await Project.findByIdAndUpdate(projectId, {
      status: allCompleted ? "Completed" : "In Progress",
    });

    return res.status(200).json({
      message: "Task updated",
      task: updatedTask,
    });
  } catch (err) {
    console.error("Task create error:", err);
    return res
      .status(500)
      .json({ message: "Server error, while updating tasks" });
  }
}

export async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const currentUserId = req.user.id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.findById(task.project);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!isOwner(project, currentUserId)) {
      return res.status(403).json({ message: "Only owner can delete tasks" });
    }

    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}

export async function getTasks(req, res) {
  try {
    const projectId = req.params.projectId;
    const currentUserId = req.user.id;

    console.log("inside getTasks, current userid ", currentUserId);

    const project = await Project.findById(projectId)
      .populate("owner", "name email")
      .populate("members", "name email")

      .populate("tasks"); //  virtual populate

    if (!project) {
      return res.status(404).json({ msg: "Project not found." });
    }

    // authorization
    if (
      !(
        isOwner(project, currentUserId) ||
        isProjectMember(project, currentUserId)
      )
    ) {
      return res
        .status(403)
        .json({ msg: "Access denied. Not a project member." });
    }

    const formattedMembers = project.members.map((m) => ({
      _id: m.user?._id || null,
      name: m.user?.name || m.email.split("@")[0],
      email: m.user?.email || m.email,
      role: m.role,
    }));

    const ownerObj = {
      _id: project.owner?._id,
      name: project.owner?.name,
      email: project.owner?.email,
      role: "owner",
    };

    return res.status(200).json({
      msg: "Task list retrieved",
      projectId,
      project: {
        _id: project._id,
        title: project.title,
        description: project.description,
        status: project.status,
        owner: ownerObj,
        members: formattedMembers,
      },
      tasks: project.tasks,
    });
  } catch (err) {
    console.error("cannot fetch all tasks :", err);
    return res.status(500).json({ msg: "Server error" });
  }
}
