import { Router } from "express";
import { approveSignupRequest, createUser, deleteSignupRequest, readAllSignupRequest, readAllUsers, readUserById, updateUserByAdmin } from "../controllers";
import { validateRequest } from "../middlewares";
import { signupSchema, updateUserByIdSchema } from "../schemas";


export const router = Router();

// read all signup requests
router.get('/read-signup-reqs', readAllSignupRequest);

// approving signup request and saving users
router.patch('/approve-signup/:id', approveSignupRequest);

// delete signup request
router.delete('/delete-signup-req/:id', deleteSignupRequest);

// create new admin/user by specified parameter
router.post('/create/:role', validateRequest(signupSchema), createUser);

// read all admins /users
router.get('/read/:role', readAllUsers);

// read user by id
router.get('/read-user/:id', readUserById);

// update user by id
router.put('/update-user/:id', validateRequest(updateUserByIdSchema), updateUserByAdmin);

