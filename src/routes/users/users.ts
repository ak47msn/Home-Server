import { Router } from 'express';

import SecUserCtrl from '@/controllers/UserCtrl/security';
import SecUserMid from '@/middlewares/UserMid/security';
import OptUserCtrl from "@/controllers/UserCtrl/options";
import OptUserMid from "@/middlewares/UserMid/options";

const router = Router();

router.post("/register", SecUserMid.encryptPassword, SecUserCtrl.register);
router.post("/login", [SecUserMid.encryptPassword, SecUserMid.checkUserExists, SecUserMid.checkUserPassword], SecUserCtrl.login);
router.get("/me", [OptUserMid.addUserToReq], OptUserCtrl.getMyProfile);


export default router;