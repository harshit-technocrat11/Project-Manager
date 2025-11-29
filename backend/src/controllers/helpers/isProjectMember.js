export const isProjectMember = (project, userId)=>{
    return project.members.some((m) => m.user && m.user.toString() === userId)
}

