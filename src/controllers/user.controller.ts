import { NextFunction, Response } from "express";
import { customRequestWithPayload, roles, signupBody, updateUserBody, updateUserByIdBody, UserToSave } from "../types";
import { logger } from "../utils/logger";
import { AuthenticationError, BadRequestError, ConflictError, InternalServerError, NotFoundError } from "../errors";
import { deleteAccountById, findAllUsersByRole, findhashPasswordById, getAllUsersWithProjects, getUserWithProjects, insertUser, updateUserById, userExistsByEmail, userExistsById } from "../services";
import { blackListToken, getEncryptedPassword, verifyPassword } from "../config";
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
        const newUser = await insertUser(userToInsert);

        res.status(201).json(await sendSuccessResponse(`New ${role} cretaed`, newUser))
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

export const readAllUserDetails = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const AllUsers = await getAllUsersWithProjects();
        res.status(200).json(await sendSuccessResponse(`Fetched all users with added  project data`, AllUsers));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const readUserById = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await getUserWithProjects(id);
        if (!user) return next(new NotFoundError('User not Found with given id'));

        res.status(200).json(await sendSuccessResponse('User details fetched', user))
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const readUserDetails = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const id = req.payload?.id;
        if (!id) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const user = await getUserWithProjects(id);
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

        res.status(200).json(await sendSuccessResponse('Updated userwith given id', isUpdated));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const deleteUserByAdmin = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const isDeleted = await deleteAccountById(id);
        if (!isDeleted) return next(new NotFoundError('User not found to delete'));

        res.status(200).json(await sendSuccessResponse('User deleted successfully'));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const updateUser = async (req: customRequestWithPayload<{}, any, updateUserBody>, res: Response, next: NextFunction) => {
    try {
        const { currentPassword, ...updateUserContent } = req.body;
        const id = req.payload?.id;
        if (!id) throw new Error('not get the id stored on payload on auth middleware');

        const hashPassword = await findhashPasswordById(id);
        if (!hashPassword) return next(new AuthenticationError('Requested By an Invalid User'));

        const isValidPassword = await verifyPassword(currentPassword, hashPassword);
        if (!isValidPassword) return next(new AuthenticationError('Invalid Password'));

        const isUpdated = await updateUserById(id, updateUserContent);
        if (!isUpdated) return next(new NotFoundError('User not Found'));

        res.status(200).json(await sendSuccessResponse('User details updated',isUpdated));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const deleteUserAccount = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const id = req.payload?.id;
        if (!id) throw new Error('The user ID was not added to the payload by the authentication middleware.');
        logger.info(id)

        const isDeleted = await deleteAccountById(id);
        if (!isDeleted) return next(new NotFoundError('User Data not found!!'));

        const AccessToken = req.headers.authorization?.split(' ')[1];
        if (!AccessToken) throw new Error('AccessToken missed from header after auth middleware');

        await blackListToken(AccessToken);

        res.status(200).json(await sendSuccessResponse('Account deleted successfully.'));
    } catch (error) {

    }
}