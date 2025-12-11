import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config as DotEven } from "dotenv";
DotEven();
import { config } from "./config";
import { mainRouter } from "./routes";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcom  to our Server");
});
app.use(config.prefix, mainRouter);
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "router path not found",
  });
});

app.listen(config.port, () => {
  console.log(`Our Server is running 🔥 on port ${config.port}`);
});

export default app;