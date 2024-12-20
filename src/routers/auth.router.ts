import { Router } from "express";
import { login, signup } from "../controllers";
import { validateRequest } from "../middlewares";
import { loginSchema, signupSchema } from "../schemas";

export const router = Router();


router.post('/login',validateRequest(loginSchema),login);

router.post('/signup',validateRequest(signupSchema),signup);

router.post('/logout');