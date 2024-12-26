import { Router } from "express";
import { validateRequest } from "../middlewares";
import { signupSchema, updateUserByIdSchema } from "../schemas";
import { signUpRequestController, userController } from "../controllers";


export const router = Router();

// read all signup requests
router.get('/read-signup-reqs', signUpRequestController.readAllSignupRequest);

// approving signup request and saving users
router.patch('/approve-signup/:id', signUpRequestController.approveSignupRequest);

// delete signup request
router.delete('/delete-signup-req/:id', signUpRequestController.deleteSignupRequest);

// create new admin/user by specified parameter
router.post('/create/:role', validateRequest(signupSchema), userController.createUser);

// read all admins /users
router.get('/read/:role', userController.readAllUsers);

// read user by id
router.get('/read-user/:id', userController.readUserById);

// update user
router.put('/update-user/:id', validateRequest(updateUserByIdSchema), userController.updateUserByAdmin);

// delete user
router.delete('/delete-user/:id', userController.deleteUserByAdmin);

// read all user with projects
router.get('/read-all', userController.readAllUserDetails);
