import { NextFunction, Response } from "express";
import { customRequestWithPayload, roles, signupBody, updateUserByIdBody, UserToSave } from "../types";
import { logger } from "../utils/logger";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from "../errors";
import { deleteUserById, findAllUsersByRole, findUserById, insertUser, updateUserById, userExistsByEmail, userExistsById } from "../services";
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
        res.status(200).json(await sendSuccessResponse(`Fetched all ${role}s`, AllUsers));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const readUserById = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await findUserById(id);
        if (!user) return next(new NotFoundError('User not Found with given id'));

        res.status(200).json(await sendSuccessResponse('User details fetched', user))
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const updateUserByAdmin = async (req: customRequestWithPayload<{ id: string }, any, updateUserByIdBody>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { updateEmail, updateUsername } = req.body;


        const isUserExistS = await userExistsById(id);
        if (!isUserExistS) return next(new NotFoundError('User not Found with given id'));

        const isUpdated = await updateUserById(id, req.body);

        if (!isUpdated) return next(new NotFoundError('User not Found with given id'));

        res.status(200).json(await sendSuccessResponse('Updated userwith given id', { id, updateUsername, updateEmail }));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const deleteUserByAdmin = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;

        const isDeleted = await deleteUserById(id);
        if(!isDeleted) return next(new NotFoundError('User not found to delete'));

        res.status(200).json(await sendSuccessResponse('User deleted successfully'));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}