import express, { Router } from "express";
import { studentRouter } from "./students";
import { userRoute } from "./user";
import { authRoute } from "./auth";

const routes: Router[] = [studentRouter, userRoute, authRoute];
const mainRouter = express();
mainRouter.use(routes);
export { mainRouter };