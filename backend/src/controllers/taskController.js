

import { Task } from "../models/Task.js";
import Project from "../models/Project.js";
import { isOwner } from "./helpers/isOwner.js";
import { isProjectMember } from "./helpers/isProjectMember.js";


// create
export async function createTask(req,res) {
    try {   
        const {title, description, dueDate, priority, assignedTo} = req.body ; 
        const projectId  = req.params.projectId

        if (! title || !description ){
          return  res.status(400).json({msg: "task title and description are mandatory fields!"})
        }

        const project= await Project.findById(projectId)

        if ( !project){
           return res.status(404).json({msg: "no such project found!"})
        }

        const currentUserId = req.user.id

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
        if (assignedTo ){     
            if ( !isProjectMember(project, currentUserId)){
                return res
                  .status(400)
                  .json({
                    msg: "The assigned user must be a member of this project.",
                  });
            }
            assignedTo = currentUserId
        }
        const task  = await Task.create({
            title, 
            description, 
            dueDate, 
            priority, 
            createdBy: currentUserId,
            assignedTo:  assignedTo,  //self assign
            project: projectId
        })

        return  res.status(201).json({msg: "task successfully created !", task: task
        })

    }
    catch(err) {
        console.log("error creating new task -", err )
        return res.status(500).json({msg: "internal server error, creating new task"})
    }
}

export async function editTask(req,res) {
    try {
        const taskId = req.params.taskId;
        const currentUserId = req.user.id;

        const task = await Task.findById(taskId)
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {

            return res.status(404).json({ message: "Project not found" });
        }

        //owners + task creators can edit the tasks only , 
        if ( !isOwner(project, currentUserId) && isProjectMember(project, currentUserId)) {
            return res.status(403).json({ message: "Not allowed" });

        }

        //valid project user

        if (req.body.assignedTo){
            const assignedTo = req.body.assignedTo;

            if ( !isProjectMember(project, assignedTo)){
                return res
                  .status(400)
                  .json({ message: "assignedTo must be a project user" });
            }
        }

        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          {$set : req.body},
          { new: True }
        );
        
        return res.status(200).json({
              message: "Task updated",
              task: updatedTask,
            });


    }
    catch(err) {
          console.error("Task create error:", err);
          return res.status(500).json({ message: "Server error, while updating tasks" });
    }
}

export async function deleteTask(req,res) {
    try {
        
    }
    catch(err) {

    }
}

export async function getTasks(req,res) {
    try {

    }
    catch(err) {

    }
}

