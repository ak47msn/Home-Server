import { Request, Response, Router } from 'express';
import FileRouter from "./files/files";
import UserRouter from "./users/users";
import DirRouter from "./directories/directories";
import UrlRouter from "./shorturl";

const router = Router();

router.use("/files", FileRouter);
router.use("/users", UserRouter);
router.use("/dirs", DirRouter);
router.use("/shorturl", UrlRouter);

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the File Server API" });
});

export default router;