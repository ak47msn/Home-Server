import User, { IUser } from "@/models/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET_KEY;
if (!secret) throw new Error("JWT_SECRET_KEY no está definido");

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export default {
    addUserToReq: async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        try {
            const decoded = jwt.verify(token, secret);
            const username = (decoded as any)?.username

            const user = await User.findOne({ username });

            if (!user) return res.status(401).json({ message: "Unauthorized" });

            var userWithoutPassword: Partial<IUser> = user.toObject();
            delete userWithoutPassword.password;
            req.user = userWithoutPassword;

            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}