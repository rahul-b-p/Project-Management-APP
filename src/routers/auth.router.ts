import { Router } from "express";
import { login } from "../controllers";
import { validateRequest } from "../middlewares";
import { loginSchema } from "../schemas/auth.schema";

export const router = Router();


router.post('/signup');

router.post('/login',validateRequest(loginSchema),login);

router.post('/logout');