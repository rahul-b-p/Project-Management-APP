import { NextFunction, Response } from "express";
import { customRequestWithPayload } from "../types";
import { logger } from "../utils/logger";
import { InternalServerError } from "../errors";
import { findAllSignupRequests } from "../services";
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

