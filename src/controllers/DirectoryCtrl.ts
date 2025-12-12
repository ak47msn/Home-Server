import { Request, Response } from "express";
import { readdirSync, statSync, lstatSync } from "fs";
import path from "path";

export default {
  readDir: async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
      if (!userId) return res.status(401).json({ message: "No autorizado" });

      const user = req.user;
      if (!user || !user.baseDir) return res.status(403).json({ message: "Usuario no tiene directorio asignado" });

      const directoryParam = req.query.directory;
      const recursive = req.query.recursive === "true";

      let relativePath = "";
      if (directoryParam && typeof directoryParam === "string") {
        relativePath = Buffer.from(directoryParam, "base64").toString("utf-8");
      }

      console.log(relativePath);

      const safeDirectory = path.resolve(user.baseDir, "." + relativePath);

      console.log(safeDirectory)
      if (!safeDirectory.startsWith(user.baseDir)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      if (!lstatSync(safeDirectory).isDirectory()) {
        return res.status(400).json({ message: "Ruta no es un directorio válido" });
      }

      const readDirRecursive = (dir: string, base: string): any[] => {
        const entries = readdirSync(dir, { withFileTypes: true });
        let files: any[] = [];

        for (const entry of entries) {
          if (entry.name.includes("\0")) continue;

          const fullPath = path.join(dir, entry.name);
          const stats = statSync(fullPath);

          if (!fullPath.startsWith(base)) continue;

          const fileObj = {
            name: entry.name,
            isDirectory: entry.isDirectory(),
            createdAt: stats.birthtime.toISOString(),
            updatedAt: stats.mtime.toISOString()
          };
          files.push(fileObj);

          if (recursive && entry.isDirectory()) {
            const nested = readDirRecursive(fullPath, base).map(f => ({
              ...f,
              name: path.join(entry.name, f.name),
            }));
            files.push(...nested);
          }
        }

        return files;
      };

      const fileList = readDirRecursive(safeDirectory, user.baseDir);
      res.json({ files: fileList });

    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: "Error leyendo directorio", error: err.message });
    }
  },
};
