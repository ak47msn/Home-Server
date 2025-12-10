import { Request, Response, Router } from 'express';
import FileRouter from "./files";
import UserRouter from "./users";

const router = Router();

router.use("/files", FileRouter);
router.use("/users", UserRouter);

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the File Server API" });
});

export default router;