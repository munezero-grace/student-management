import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config as DotEven } from "dotenv";
DotEven();
import { config } from "./config";
import { mainRouter } from "./routes";
import { ERROR_MESSAGES } from "./constants/response/errorMessages";
import { HTTP_NOT_FOUND } from "./constants/response/httpStatusCode";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome  to our Server");
});
app.use(config.prefix, mainRouter);
app.use((req: Request, res: Response) => {
  res.status(HTTP_NOT_FOUND).json({
    message: ERROR_MESSAGES.GENERAL.ROUTER_PATH_NOT_FOUND,
  });
});

app.listen(config.port, () => {
  console.log(`Our Server is running 🔥 on port ${config.port}`);
});

export default app;
