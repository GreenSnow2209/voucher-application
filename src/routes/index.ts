import express from "express";
import AuthRoutes from "./auth.routes";
import UsersRoute from "./users.route";
import VouchersRoute from "./vouchers.route";
import EventRoute from "./events.route";

const routes = express.Router();

routes.use('/auth', AuthRoutes);
routes.use('/users', UsersRoute);
routes.use('/vouchers', VouchersRoute);
routes.use('/events', EventRoute);

export default routes;
