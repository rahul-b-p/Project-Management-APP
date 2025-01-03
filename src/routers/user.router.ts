import { Router } from "express";
import { validateRequest } from "../middlewares";
import { projectSchema, updateProjectSchema, updateUserSchema } from "../schemas";
import { projectController, userController } from "../controllers";

export const router = Router();

// readd user details
router.get('/read', userController.readUserDetails);

// update user credentials
router.put('/update', validateRequest(updateUserSchema), userController.updateUser);

router.delete('/delete',userController.deleteUserAccount);

// create project
router.post('/create-project', validateRequest(projectSchema), projectController.createProject);

// read Projects by Id
router.get('/read-project/:id', projectController.readProjectById);

// read all projects by user
router.get('/read-projects', projectController.readAllProjectsByUser);

// update Project
router.put('/update-project/:id', validateRequest(updateProjectSchema), projectController.updateProject);

// delete Project
router.delete('/delete-Project/:id', projectController.deleteProject);

// delete all project
router.delete('/deleteAll-project', projectController.deleteAllProjectsByUser);
