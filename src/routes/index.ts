import express from "express";
import UsersRoute from "./users-route";
import VouchersRoute from "./vouchers-route";

const routes = express.Router();

routes.use('/users', UsersRoute);
routes.use('/vouchers', VouchersRoute);

export default routes;
