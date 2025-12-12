import Project from "../models/Project.js";
import { Task } from "../models/Task.js";
import User from "../models/User.js";

import sendEmail from "../utils/sendEmail.js";
import { isOwner } from "./helpers/isOwner.js";

// add member to a project
export async function handleAddMember(req, res) {
  try {
    const { projectId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "email is a required field !" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found 404" });
    }

    // only owner can add members
    // req.user.id -> CURRENT user from authmiddleware
    // project.owner --> id converted from mongooseObjectId type to normal string

    // checking if CURNT- USER is not the OWNER
    if (project.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Only project owner can add members" });
    }

    //if user acc already exissts
    const userToBeAdded = await User.findOne({ email });
     await sendEmail({
      fromName: req.user.name,
      fromEmail: req.user.email,
       toEmail: email,
       projectName: project.title,
       projectId: project._id,
     });


    // is the member already a part of the proj ?
    const alreadyMember = project.members.find(
      (m) => m.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyMember) {
      return res.status(400).json({ msg: "user already added" });
    }

    // add member entry ( userId = null , if User DNE)
    project.members.push({
      user: userToBeAdded ? userToBeAdded._id : null,
      email,
      role: "member",
    });

    await project.save(); //new member added to DB (after signup) --> members:[] list

    // send email
    await sendEmail({
      fromName: req.user.name,
      fromEmail: req.user.email,
      toEmail: email,
      projectName: project.title,
      projectId: project._id,
    });

    return res.status(200).json({
      message: "Invitation sent successfully",
      members: project.members,
    });
  } catch (err) {
    console.error("add member error - ", err);
    return res.status(500).json({ msg: "Server error" });
  }
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
  } catch (err) {
    console.error("Get Members Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}

export async function handleRemoveMember(req, res) {
  try {
    const { memberId, projectId } = req.params;
    const currentUserId = req.user.id;

    console.log("delete request for:", memberId);

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // ONLY owner can remove members
    if (!isOwner(project, currentUserId)) {
      return res
        .status(403)
        .json({ msg: "Only the project owner can remove members" });
    }

    // owner cannot delete themselves
    if (memberId === project.owner.toString()) {
      return res.status(400).json({ msg: "Owner cannot remove themselves" });
    }

    
    const memberEntry = project.members.find(
      (m) => m.user?.toString() === memberId
    );

    if (!memberEntry) {
      return res.status(404).json({ msg: "Member not found in this project" });
    }

    const removedUserId = memberEntry.user;

    // REMOVE MEMBER from project
    await Project.findByIdAndUpdate(projectId, {
      $pull: { members: { user: removedUserId } },
    });

    // unassign all the tasks of removed user
    if (removedUserId) {
      await Task.updateMany(
        { assignedTo: removedUserId, project: projectId },
        { $set: { assignedTo: null } }
      );
    }

    return res.status(200).json({ msg: "Member removed successfully" });
  } catch (err) {
    console.error("Error removing member:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}
