import { NextFunction, Response } from "express";
import { customRequestWithPayload, roles, signupBody, UserToSave } from "../types";
import { logger } from "../utils/logger";
import { BadRequestError, ConflictError, InternalServerError } from "../errors";
import { findAllUsersByRole, insertUser, userExistsByEmail } from "../services";
import { getEncryptedPassword } from "../config";
import { sendSuccessResponse } from "../utils/successResponse";




export const createUser = async (req: customRequestWithPayload<{ role: string }, any, signupBody>, res: Response, next: NextFunction) => {
    try {
        const { role } = req.params;
        const { email, password, username } = req.body;

        if (role !== roles.user && role !== roles.admin) return next(new BadRequestError('Requested to create an Invalid role'));

        const isUserExists = await userExistsByEmail(email);
        if (isUserExists) return next(new ConflictError("Email already in use. Please use a different email."));

        const hashPassword = await getEncryptedPassword(password);

        const userToInsert: UserToSave = {
            username, email, hashPassword, role
        }
        await insertUser(userToInsert);

        res.status(201).json(await sendSuccessResponse(`New ${role} cretaed`, { username, email }))
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const readAllUsers = async (req: customRequestWithPayload<{ role: string }>, res: Response, next: NextFunction) => {
    try {
        const { role } = req.params;
        if (role !== roles.user && role !== roles.admin) return next(new BadRequestError('Requested to fetch users of role'));
        const AllUsers = await findAllUsersByRole(role);
        logger.info(AllUsers)
        res.status(200).json(await sendSuccessResponse(`Fetched all ${role}s`,AllUsers));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}