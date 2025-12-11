import { Request, Response } from "express";
import { readdirSync, statSync, lstatSync } from "fs";
import path from "path";

export default {
  readDir: async (req: Request, res: Response) => {
    try {
      // 1. Verificar autenticación
      const userId = req.user?._id;
      if (!userId) return res.status(401).json({ message: "No autorizado" });

      const user = req.user;
      if (!user || !user.baseDir) return res.status(403).json({ message: "Usuario no tiene directorio asignado" });

      // 2. Obtener parámetros
      const directoryParam = req.query.directory;
      const recursive = req.query.recursive === "true";

      let relativePath = "";
      if (directoryParam && typeof directoryParam === "string") {
        relativePath = Buffer.from(directoryParam, "base64").toString("utf-8");
      }

      console.log(relativePath);

      // 3. Construir ruta segura
      const safeDirectory = path.resolve(user.baseDir, "." + relativePath);

      console.log(safeDirectory)
      // 4. Validar que no escape del baseDir
      if (!safeDirectory.startsWith(user.baseDir)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      // 5. Validar que sea un directorio
      if (!lstatSync(safeDirectory).isDirectory()) {
        return res.status(400).json({ message: "Ruta no es un directorio válido" });
      }

      // 6. Función para leer directorio recursivamente de forma segura
      const readDirRecursive = (dir: string, base: string): any[] => {
        const entries = readdirSync(dir, { withFileTypes: true });
        let files: any[] = [];

        for (const entry of entries) {
          // Evitar archivos peligrosos o nombres con caracteres extraños
          if (entry.name.includes("\0")) continue;

          const fullPath = path.join(dir, entry.name);
          const stats = statSync(fullPath);

          // Validar que siga dentro del baseDir
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
