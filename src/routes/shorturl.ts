import { Router } from "express";
import UrlCtrl from "@/controllers/UrlCtrl";
import UserMid from "@/middlewares/UserMid/options";
import { checkUrlLength, checkValidURL } from "@/middlewares/UrlMid";

const router = Router();

router.get("/list", [UserMid.addUserToReq], UrlCtrl.getUrls);
router.get("/:short", UrlCtrl.redirectUrl);
router.post("/create", [UserMid.addUserToReq, checkValidURL, checkUrlLength], UrlCtrl.createUrl);
router.delete("/delete/:id", [UserMid.addUserToReq], UrlCtrl.deleteUrl);

export default router;