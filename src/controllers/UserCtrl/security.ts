import { Request, Response } from 'express';
import User from '@/models/User';
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET_KEY;
if (!secret) throw new Error("JWT_SECRET_KEY no está definido");



export default {
    login: (req: Request, res: Response) => {
        const { username } = req.body;

        const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

        console.log(token);

        return res.status(200).json({ message: "Logged In Successfully", token });
    },
    register: async (req: Request, res: Response) => {
        const userData = req.body;

        userData.baseDir = `C:\\Users\\mmesinoiru\\usuarios\\${userData.email}`

        const newUser = new User(userData);

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    },
}