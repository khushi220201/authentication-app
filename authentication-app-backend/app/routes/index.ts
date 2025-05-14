import express from "express";
import authRoutes from "./authRoutes";
import { errorHandler, notFound } from "../middleware/errorHanlder";
const routes = express.Router();

routes.use("/auth", authRoutes);

routes.use(errorHandler);
routes.use(notFound)

export default routes;
