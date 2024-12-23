import { Router } from "express";
import { readAllSignupRequest } from "../controllers";


export const router = Router();


router.get('/read-signup-reqs', readAllSignupRequest);