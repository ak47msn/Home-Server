import { Request, Response } from "express";
import { readdirSync, statSync } from "fs";
import path from "path";

export default {
  readDir: async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id; // auth middleware
      if (!userId) return res.status(401).json({ message: "No autorizado" });

      const user = req.user; // suponiendo que tu middleware pone baseDir en req.user
      if (!user || !user.baseDir) return res.status(403).json({ message: "Usuario no tiene directorio asignado" });

      const directoryParam = req.query.directory;
      const recursive = req.query.recursive === "true";

      let relativePath = "";
      if (directoryParam && typeof directoryParam === "string") {
        relativePath = Buffer.from(directoryParam, "base64").toString("utf-8");
      }

      const safeDirectory = path.resolve(user.baseDir, "." + relativePath);

      if (!safeDirectory.startsWith(user.baseDir)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      const readDirRecursive = (dir: string): any[] => {
        const entries = readdirSync(dir, { withFileTypes: true });
        let files: any[] = [];

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const stats = statSync(fullPath);

          const fileObj = { 
            name: entry.name, 
            isDirectory: entry.isDirectory(),
            createdAt: stats.birthtime.toISOString(),
            updatedAt: stats.mtime.toISOString()
          };
          files.push(fileObj);

          if (recursive && entry.isDirectory()) {
            const nested = readDirRecursive(fullPath).map(f => ({
              ...f,
              name: path.join(entry.name, f.name),
            }));
            files.push(...nested);
          }
        }
        return files;
      };

      const fileList = readDirRecursive(safeDirectory);
      res.json({ files: fileList });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: "Error leyendo directorio", error: err.message });
    }
  },
};
