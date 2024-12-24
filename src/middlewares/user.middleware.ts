import { NextFunction, Response } from "express";
import { customRequestWithPayload } from "../types";
import { userExistsById } from "../services";
import { AuthenticationError, InternalServerError } from "../errors";
import { logger } from "../utils/logger";



export const verifyUser = async(req: customRequestWithPayload, res: Response, next: NextFunction) => {
try {
        const id = req.payload?.id;
        if (!id) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const userExists = await userExistsById(id);
        if (!userExists) return next(new AuthenticationError('Invalid or expired access token. User not found.'));

        next();
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}