import { Router } from "express";
import { validateRequest } from "../middlewares";
import { projectSchema, updateUserSchema } from "../schemas";
import { projectController, userController } from "../controllers";

export const router = Router();

// update user credentials
router.put('/update', validateRequest(updateUserSchema), userController.updateUser);

// create project
router.post('/create-project', validateRequest(projectSchema), projectController.createProject);

// read Projects by Id
router.get('/read-project/:id',projectController.readProjectById);
