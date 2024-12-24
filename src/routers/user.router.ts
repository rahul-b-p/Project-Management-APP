import { Router } from "express";
import { validateRequest } from "../middlewares";
import { updateUserSchema } from "../schemas";
import { userController } from "../controllers";

export const router = Router();

// update user credentials
router.put('/update',validateRequest(updateUserSchema),userController.updateUser);