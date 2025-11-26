import {Router} from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"

import {
    handleAddMember, 
    handleRemoveMember,
    handleGetMembers,
} from ""

const MemberRouter = Router();

MemberRouter.use("/:projectId", authMiddleware)

  //    /:projectId/add
  //   /:projectId/    
  //  /:projectId/:memberId

  .post("/add", handleAddMember)
  .get("/", handleGetMembers)
  .delete("/remove/:memberId", handleRemoveMember);

export default MemberRouter