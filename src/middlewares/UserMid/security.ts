import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import User from '@/models/User';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export default {
    /* Password Encryption Middleware */
    encryptPassword: async (req: Request, _res: Response, next: NextFunction) => {
        const { password } = req.body;

        req.body.password = crypto.createHash('sha256').update(password).digest('hex');

        next();
    },

    /* Login Middlewares */
    checkUserExists: async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        if (!username || !password) return res.status(401).json({ message: "Invalid credentials" });

        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        req.user = user;

        next();
    },
    checkUserPassword: async (req: Request, res: Response, next: NextFunction) => {
        const { password } = req.body;

        if (req.user.password !== password) return res.status(401).json({ message: "Invalid credentials" });

        next();
    }
}