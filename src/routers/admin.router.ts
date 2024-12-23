import { Router } from "express";
import { approveSignupRequest, createUser, deleteSignupRequest, readAllSignupRequest } from "../controllers";
import { validateRequest } from "../middlewares";
import { signupSchema } from "../schemas";


export const router = Router();

// read all signup requests
router.get('/read-signup-reqs', readAllSignupRequest);

// approving signup request and saving users
router.patch('/approve-signup/:id', approveSignupRequest);

// delete signup request
router.delete('/delete-signup-req/:id', deleteSignupRequest);

// create new admin/user by specified parameter
router.post('/create/:role', validateRequest(signupSchema), createUser);

