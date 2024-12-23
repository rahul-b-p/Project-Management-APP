import { Router } from "express";
import { refreshTokenAuth } from "../middlewares";
import { authController } from "../controllers";

export const router = Router();


router.post('/', refreshTokenAuth, authController.refreshToken);