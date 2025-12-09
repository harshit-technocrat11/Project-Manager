export const isProjectMember = (project, userId)=>{
    console.log("inside members:", project.members)
    return project.members.some((m) => m?.user && m?.user.toString() === userId)
}

