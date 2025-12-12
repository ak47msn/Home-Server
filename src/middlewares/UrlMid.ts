import { Request, Response, NextFunction } from "express";

export const checkValidURL = (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
        return res.status(400).json({ message: "URL inválida" });
    }

    try {
        new URL(url);
        next();
    } catch (err) {
        return res.status(400).json({ message: "URL no es válida" });
    }
};

export const checkUrlLength = (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;

    if (url.length > 2048) {
        return res.status(400).json({ message: "URL demasiado larga" });
    }

    next();
};
