import { NextFunction, Response } from "express";
import { customRequestWithPayload, roles } from "../types";
import { findRoleById } from "../services";
import { AuthenticationError, InternalServerError } from "../errors";
import { ForbiddenError } from "../errors/forbidden.error";
import { logger } from "../utils/logger";





export const verifyAdmin = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const id = req.payload?.id;
        if (!id) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const role = await findRoleById(id);
        if (!role) return next(new AuthenticationError('Invalid or expired access token. User not found.'));

        if (role !== roles.admin) return next(new ForbiddenError('Access denied. Admin privileges are required to perform this action.'));

        next();
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}