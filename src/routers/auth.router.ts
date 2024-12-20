import { Router } from "express";
import { login, logout, signup } from "../controllers";
import { accessTokenAuth, validateRequest } from "../middlewares";
import { loginSchema, signupSchema } from "../schemas";

export const router = Router();


router.post('/login',validateRequest(loginSchema),login);

router.post('/signup',validateRequest(signupSchema),signup);

router.post('/logout',accessTokenAuth,logout);