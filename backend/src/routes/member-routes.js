import {Router} from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"

import {
    handleAddMember, 
    handleRemoveMember,
    handleGetMembers,
} from "../controllers/memberController.js"

const MemberRouter = Router();


// protection
MemberRouter.use(authMiddleware);

// POST /api/members/:projectId/add
MemberRouter.post("/:projectId/add", handleAddMember);

// GET /api/members/:projectId
MemberRouter.get("/:projectId", handleGetMembers);

// DELETE /api/members/:projectId/remove/:memberId
MemberRouter.delete("/:projectId/remove/:memberId", handleRemoveMember);

export default MemberRouter