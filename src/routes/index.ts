import express from "express";
import AuthRoutes from "./auth.route";
import UsersRoute from "./user.route";
import VouchersRoute from "./voucher.route";
import EventRoute from "./event.route";

const routes = express.Router();

routes.use('/auth', AuthRoutes);
routes.use('/users', UsersRoute);
routes.use('/vouchers', VouchersRoute);
routes.use('/events', EventRoute);

export default routes;
