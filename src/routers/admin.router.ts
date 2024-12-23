import { Router } from "express";
import { approveSignupRequest, readAllSignupRequest } from "../controllers";


export const router = Router();

// read all signup requests
router.get('/read-signup-reqs', readAllSignupRequest);

// approving signup request and saving users
router.patch('/approve-signup/:id', approveSignupRequest);

