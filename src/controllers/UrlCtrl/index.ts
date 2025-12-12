import { Request, Response } from "express";
import Url from "@/models/Url";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const createRandomString = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);
    randomArray.forEach((number) => {
        result += chars[number % chars.length];
    });
    return result;
}

export default {
    createUrl: async (req: Request, res: Response) => {
        try {
            const { url } = req.body;
            const id = req.user?._id;

            if (!id) return res.status(401).json({ message: "No autorizado" });
            if (!url || typeof url !== "string") return res.status(400).json({ message: "URL inválida" });

            let shorted: string;
            let exists: boolean;
            do {
                shorted = createRandomString(6);
                const existing = await Url.findOne({ shorted });
                exists = !!existing;
            } while (exists);

            const newUrl = new Url({
                original: url,
                shorted,
                owner: id
            });

            await newUrl.save();

            res.status(201).json({ url: newUrl });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: "Error creando URL", error: err.message });
        }
    },

    deleteUrl: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = req.user;
            if (!user) return res.status(401).json({ message: "No autorizado" });

            const url = await Url.findById(id);
            if (!url) return res.status(404).json({ message: "URL no encontrada" });
            console.log(url.owner + " + " + user._id);
            if (url.owner.toString() !== user._id.toString()) {
                return res.status(403).json({ message: "No puedes eliminar esta URL" });
            }
            await Url.deleteOne({ _id: url._id });
            res.json({ message: "URL eliminada correctamente" });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: "Error eliminando URL", error: err.message });
        }
    },

    getUrls: async (req: Request, res: Response) => {
        try {
            const user = req.user;
            if (!user) return res.status(401).json({ message: "No autorizado" });

            const urls = await Url.find({ owner: user._id }).sort({ createdAt: -1 });
            res.json({ urls });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: "Error obteniendo URLs", error: err.message });
        }
    },

    redirectUrl: async (req: Request, res: Response) => {
        try {
            const { short } = req.params;
            const url = await Url.findOne({ shorted: short });
            if (!url) return res.status(404).json({ message: "URL no encontrada" });

            res.redirect(url.original);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: "Error redirigiendo URL", error: err.message });
        }
    }
};
