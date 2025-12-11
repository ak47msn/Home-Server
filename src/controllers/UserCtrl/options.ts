import { Request, Response } from "express";

export default {
    getUserInfo: (req: Request, res: Response) => {

    },
    updateUserInfo: (req: Request, res: Response) => {

    },
    updatePassword: (req: Request, res: Response) => {

    },
    getMyProfile: (req: Request, res: Response) => {
        return res.status(200).json(req.user);
    }
}