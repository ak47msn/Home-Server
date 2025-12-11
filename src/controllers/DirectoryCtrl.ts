import { Request, Response } from "express";
import { readdirSync } from "fs";
import path from "path";

export default {
  readDir: async (req: Request, res: Response) => {
    const directoryParam = req.query.directory;

    if (!directoryParam || Array.isArray(directoryParam)) {
      return res.status(400).json({ message: "Invalid directory" });
    }

    try {
      const decodedDir = Buffer.from(String(directoryParam), "base64").toString("utf-8");

      const safeDirectory = path.resolve(decodedDir);

      const directories = readdirSync(safeDirectory, { withFileTypes: true });

      const fileList = directories.map(file => ({
        name: file.name,
        isDirectory: file.isDirectory(),
      }));

      return res.json({ files: fileList });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({
        message: `Cannot read directory`,
        error: err.message,
      });
    }
  },

  deleteDir: async (req: Request, res: Response) => {
    // implementación futura
  }
};
