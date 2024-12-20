import { Router } from "express";
import { refreshTokenAuth } from "../middlewares";
import { refreshToken } from "../controllers";

export const router = Router();


router.post('/',refreshTokenAuth,refreshToken);