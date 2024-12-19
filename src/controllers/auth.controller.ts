import { NextFunction, Request, Response } from "express";
import { loginBody } from "../types";
import { findUserByEmail } from "../services/user.service";
import { AuthenticationError, NotFoundError } from "../errors";
import { signAccessToken, verifyPassword } from "../config";
import { logger } from "../utils/logger";
import { signRefreshToken } from "../config";
import { InternalServerError } from "../errors/server.error";
import { sendSuccessResponse } from "../utils/successResponse";




export const login = async (req: Request<{}, any, loginBody>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if(!existingUser) return next(new NotFoundError('User not found with given email id'));
        
        const isVerifiedPassword = await verifyPassword(password,existingUser.hashPassword);
        if(!isVerifiedPassword) return next(new AuthenticationError('Invalid Password'));

        const AccessToken = await signAccessToken(existingUser._id.toString(),existingUser.role);
        const RefreshToken = await signRefreshToken(existingUser._id.toString(),existingUser.role);

        res.statusMessage="Login Successful"
        res.status(200).json(await sendSuccessResponse('Login Successful',{AccessToken,RefreshToken}));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}