import express from "express";
import router from "./routes";
import connectToDatabase from "./config/database";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectToDatabase();

  app.use(express.json());
  app.use("/api", router);

  app.listen(PORT, () => {
    console.log(`File Server is running on http://localhost:${PORT}`);
  });
};

startServer();
