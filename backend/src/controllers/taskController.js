import { Task } from "../models/Task.js";
import Project from "../models/Project.js";
import { isOwner } from "./helpers/isOwner.js";
import { isProjectMember } from "./helpers/isProjectMember.js";

// create
export async function createTask(req, res) {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;
    const projectId = req.params.projectId;

    if (!title) {
      return res.status(400).json({ msg: "task 'title' - mandatory field!" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "no such project found!" });
    }

    const currentUserId = req.user.id;

    // only owners / members can create tasks
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

      // validation
    let finalAssignedTo = null;

    if (assignedTo) {
      const isOwnerUser = project.owner.toString() === assignedTo;
      const isMemberUser = project.members.some(
        (m) => m.user?.toString() === assignedTo
      );

      if (!isOwnerUser && !isMemberUser) {
        return res
          .status(400)
          .json({ msg: "Assigned user must belong to this project." });
      }

      finalAssignedTo = assignedTo; 
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      createdBy: currentUserId,
      assignedTo: finalAssignedTo,
      project: projectId,
    });

    return res.status(201).json({ msg: "task successfully created!", task });
  } catch (err) {
    console.log("error creating new task -", err);
    return res.status(500).json({ msg: "internal server error" });
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

    //  Permission check: only owner + task creator can edit ---
    const userIsOwner = project.owner.toString() === currentUserId;
    const userIsTaskCreator = task.createdBy.toString() === currentUserId;

    if (!userIsOwner && !userIsTaskCreator) {
      return res.status(403).json({ message: "Not allowed to edit this task" });
    }

    // Validate assignedTo (if provided) ---
    if ("assignedTo" in req.body) {
      const assignedTo = req.body.assignedTo;

      // Allow null (unassign)
      if (assignedTo === null || assignedTo === "none" || assignedTo === "") {
        req.body.assignedTo = null;
      } else {
        const isOwnerUser = project.owner.toString() === assignedTo;
        const isMemberUser = project.members.some(
          (m) => m.user?.toString() === assignedTo
        );

        if (!isOwnerUser && !isMemberUser) {
          return res.status(400).json({
            message: "assignedTo must be a project member or the owner",
          });
        }

        req.body.assignedTo = assignedTo;
      }
    }

    console.log("Updating task with:", req.body);

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );

    // project status update
    const allTasks = await Task.find({ project: updatedTask.project });

    const allCompleted = allTasks.every((t) => t.status === "completed");

    const newStatus = allCompleted ? "Completed" : "In Progress";

    await Project.findByIdAndUpdate(updatedTask.project, {
      status: newStatus,
    });

    return res.status(200).json({
      message: "Task updated",
      task: updatedTask,
      projectStatus: newStatus,
    });
  } catch (err) {
    console.error("Task update error:", err);
    return res
      .status(500)
      .json({ message: "Server error while updating task" });
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
