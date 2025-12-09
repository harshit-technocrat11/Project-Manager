
export const  isOwner = (project, userId)=>{
    console.log("inside owner:", project.owner)
    return project.owner._id.toString()===userId;
} 