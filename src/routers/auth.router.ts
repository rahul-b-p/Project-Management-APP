import { Router } from "express";
import { authController } from "../controllers";
import { accessTokenAuth, validateRequest } from "../middlewares";
import { loginSchema, signupSchema } from "../schemas";

export const router = Router();


router.post('/login',validateRequest(loginSchema),authController.login);

router.post('/signup',validateRequest(signupSchema),authController.signup);

router.post('/logout',accessTokenAuth,authController.logout);