import { NextFunction, Response } from "express";
import { customRequestWithPayload, projectBody } from "../types";
import { logger } from "../utils/logger";
import { InternalServerError } from "../errors";
import { insertProject } from "../services";
import { sendSuccessResponse } from "../utils/successResponse";




export const createProject = async (req: customRequestWithPayload<{}, any, projectBody>, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload?.id;
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        await insertProject(userId,req.body);
        res.status(201).json(await sendSuccessResponse('new Project created',req.body));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}