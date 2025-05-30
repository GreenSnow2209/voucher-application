import express from "express";
import UsersController from "../controllers/users-controller"

const router = express.Router();

router.get('/', UsersController.getAll);
router.get('/:id', UsersController.findOne);
router.put('/:id', UsersController.update);
router.post('/', UsersController.create);
router.delete('/:id', UsersController.remove);

export default router;