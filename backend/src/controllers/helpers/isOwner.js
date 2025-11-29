
export const  isOwner = (project, userId)=>{
    return project.owner.toString()===userId;
} 