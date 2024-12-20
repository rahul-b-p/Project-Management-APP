import { NextFunction, Request, Response } from "express";
import { customRequestWithPayload, loginBody, signupBody } from "../types";
import { findUserByEmail, findUserById, insertIntoPUser, pUserExistsByEmail, updateRefreshToken, userExistsByEmail } from "../services";
import { AuthenticationError, NotFoundError, InternalServerError, ConflictError } from "../errors";
import { signAccessToken, verifyPassword, signRefreshToken } from "../config";
import { logger } from "../utils/logger";
import { sendSuccessResponse } from "../utils/successResponse";




export const login = async (req: Request<{}, any, loginBody>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if (!existingUser) return next(new NotFoundError('User not found with given email id'));

        const isVerifiedPassword = await verifyPassword(password, existingUser.hashPassword);
        if (!isVerifiedPassword) return next(new AuthenticationError('Invalid Password'));

        const AccessToken = await signAccessToken(existingUser._id.toString(), existingUser.role);
        const RefreshToken = await signRefreshToken(existingUser._id.toString(), existingUser.role);

        await updateRefreshToken(existingUser._id, RefreshToken)

        res.statusMessage = "Login Successful"
        res.status(200).json(await sendSuccessResponse('Login Successful', { AccessToken, RefreshToken }));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const signup = async (req: Request<{}, any, signupBody>, res: Response, next: NextFunction) => {
    try {
        const { username, email } = req.body;

        const isVerificationPending = await pUserExistsByEmail(email);
        if (isVerificationPending) return next(new ConflictError("Your signup request is already pending admin verification. Please wait up to 48 hours."));

        const isUserExists = await userExistsByEmail(email);
        if (isUserExists) return next(new ConflictError("Email already in use. Please use a different email."));

        await insertIntoPUser(req.body);
        res.status(201).json(await sendSuccessResponse("Signup request submitted with a validity period of 48 hours. Users can resubmit a request if not verified within this timeframe.", { username, email }));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const refreshToken = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const id = req.payload?.id
        if (!id) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const existingUser = await findUserById(id);
        if(!existingUser) return next(new NotFoundError());

        const AccessToken = await signAccessToken(existingUser._id.toString(), existingUser.role);
        const RefreshToken = await signRefreshToken(existingUser._id.toString(), existingUser.role);

        await updateRefreshToken(existingUser._id, RefreshToken);

        res.status(200).json(await sendSuccessResponse('Token refreshed successfully',{AccessToken,RefreshToken}));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}