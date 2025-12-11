import { Router } from "express";
import DirCtrl from "@/controllers/DirectoryCtrl"
import UserMid from "@/middlewares/UserMid/options"

const router = Router();

router.get("/read", UserMid.addUserToReq, DirCtrl.readDir);

export default router;