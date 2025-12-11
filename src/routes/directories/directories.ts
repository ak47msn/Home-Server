import { Router } from "express";
import DirCtrl from "@/controllers/DirectoryCtrl"


const router = Router();

router.get("/read", DirCtrl.readDir);

export default router;