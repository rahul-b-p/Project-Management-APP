import { NextFunction, Response } from "express";
import { customRequestWithPayload, roles, UserToSave } from "../types";
import { logger } from "../utils/logger";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors";
import { deleteSignupRequestById, findAllSignupRequests, findSignupRequestById, insertUser } from "../services";
import { sendSuccessResponse } from "../utils/successResponse";



export const readAllSignupRequest = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const allSignupRequests = await findAllSignupRequests();
        res.status(200).json(await sendSuccessResponse('Fetched all signup requests', allSignupRequests));
    } catch (error: any) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const approveSignupRequest = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const existingSignupRequest = await findSignupRequestById(id);
        if (!existingSignupRequest) return next(new BadRequestError('Invalid signup request ID.'));
        const userToInsert:UserToSave= {...existingSignupRequest,role:roles.user}
        await insertUser(userToInsert);
        await deleteSignupRequestById(id);

        const { username, email } = existingSignupRequest;
        res.status(201).json(await sendSuccessResponse('User created successfully.', { username, email }));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const deleteSignupRequest = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const isDeleted = await deleteSignupRequestById(id);
        if (!isDeleted) return next(new NotFoundError('Signup Request not found'));

        res.status(200).json(await sendSuccessResponse('Signup request deleted successfully.'));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}
