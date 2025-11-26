import Project from "../models/Project.js";

import User from "../models/User.js";

import sendEmail from "../utils/sendEmail.js";

// add member to a project
export async function handleAddMember(req, res) {
  try {
    const { projectId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "email is a required field !" });
    }

    const project = await Project.findById({ projectId });

    if (!project) {
      return res.status(404).json({ msg: "Project not found 404" });
    }

    // only owner can add members
    // req.user.id -> if form auth m/w
    // project.owner --> id converted from mongooseObjectId type to normal string
    if (project.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only project owner can add members" });
    }

    //if user acc already exissts
    const user = await User.findOne({ email });

    // prevent duplicate addition
    const alreadyMember = project.members.find(
      (m) => m.email.toLowerCase() === email.toLowerCase()
    );

    // add member entry ---
    project.members.push({});
  } catch (err) {}
}

export async function handleGetMembers(req, res) {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate({
      path: "members.user",
      select: "name email",
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found 404" });
    }

    return res
      .status(200)
      .json({ msg: "members list: ", members: project.members });

  }
   catch (err) {
    console.error("Get Members Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function handleRemoveMember(req, res) {
  try {
  } catch (err) {}
}
