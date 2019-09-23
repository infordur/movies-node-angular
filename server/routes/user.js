import express from 'express';
import UserController from "../controllers/userController";

const userRoutes = express.Router()

userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/:id', UserController.getAUser);
userRoutes.post('/', UserController.addUser);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);


export default userRoutes;