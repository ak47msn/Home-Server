import { Request, Response } from 'express';
import File from "@/models/File"

export default {
    /* Controlador que obtiene los metadatos del archivo */
    getFile: (req: Request, res: Response) => {
        const { id } = req.params;

        const file = File.findById(id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        res.status(200).json(file);
    },
    /* Controlador que descarga el archivo */
    downloadFile: (req: Request, res: Response) => {

    },
    uploadFile: (req: Request, res: Response) => {

    },
    deleteFile: (req: Request, res: Response) => {

    },
    updateFile: (req: Request, res: Response) => {

    },
    searchFiles: (req: Request, res: Response) => {

    }
};