import { Task } from "../models/Task.js";
import Project from "../models/Project.js";

export async function getDashboardStats(req, res) {
  try {
    const userId = req.user.id;

    //  all projects where user is owner or member
    const projects = await Project.find({
      $or: [{ owner: userId }, { "members.user": userId }],
    }).select("_id title");

    const projectIds = projects.map((p) => p._id);

    //  all tasks assigned to this user
    const tasks = await Task.find({
      project: { $in: projectIds },
      assignedTo: userId,
    });

    const totalProjects = projects.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const pendingTasks = tasks.filter((t) => t.status === "pending").length;

   const today = new Date().toISOString().slice(0, 10);

   const dueToday = tasks.filter((t) => {
     if (!t.dueDate) return false;

     const formatted =
       typeof t.dueDate === "string"
         ? t.dueDate.slice(0, 10)
         : new Date(t.dueDate).toISOString().slice(0, 10);

     return formatted === today;
   }).length;

    return res.status(200).json({
      totalProjects,
      completedTasks,
      pendingTasks,
      dueToday,
    });
  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}

export async function getOverdueTasks(req, res) {
  try {
    const userId = req.user.id;


    const today = new Date().toISOString().slice(0, 10);

    const tasks = await Task.find({
      assignedTo: userId,
      status: "pending",
      dueDate: { $lt: today },
    })
      .populate("project", "title")
      .lean();

    return res.status(200).json({ overdue: tasks });
  } catch (err) {
    console.error("OVERDUE TASKS ERROR", err);
    return res.status(500).json({ msg: "Server error fetching overdue tasks" });
  }
}
