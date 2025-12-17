import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { config } from "./config";
import { mainRouter } from "./routes";
import { databaseconnection } from "./config/database";

const app = express();

// Crash early if JWT secret is not provided
if (!config.jwtSecret) {
  console.error("FATAL: JWT_SECRET is not set. Set JWT_SECRET in environment and restart.");
  process.exit(1);
}

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
