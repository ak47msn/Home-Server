import "module-alias/register"

import path from "path";
import express from "express";
import router from "./routes";
import connectToDatabase from "./config/database";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar DB
const startServer = async () => {
  await connectToDatabase();

  app.use(express.json());

  app.use("/api", router);

  const clientBuildPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientBuildPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`File Server is running on http://localhost:${PORT}`);
  });
};

startServer();
