import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { config } from "./config";
import { mainRouter } from "./routes";
import { databaseconnection } from "./config/database"; // ✅ adjust to real path

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to our Server"));

app.use(config.prefix, mainRouter);

app.use((req, res) => {
  res.status(404).json({ message: "router path not found" });
});

databaseconnection()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

export default app;
