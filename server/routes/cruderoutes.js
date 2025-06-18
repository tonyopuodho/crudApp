import { Router } from "express";
import  crudecontroller from "../controllers/crudecontroller.cjs";
const router = Router()

router.get("/api/users", crudecontroller.showusers)
router.get("/api/users/:id", crudecontroller.showuserbyId)
router.post("/api/users",crudecontroller.createuser)
router.post("/api/search", crudecontroller.searchuser)
router.delete("/api/users/:id", crudecontroller.deleteuser)
router.patch("/api/users", crudecontroller.edituser)

export default router