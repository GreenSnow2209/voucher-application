import express from "express";
import UsersRoute from "./users-route";

const routes = express.Router();

routes.use('/users', UsersRoute);

export default routes;
