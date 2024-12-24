import { NextFunction, Response } from "express";
import { customRequestWithPayload, projectBody } from "../types";
import { logger } from "../utils/logger";
import { InternalServerError, NotFoundError } from "../errors";
import { deleteProjectById, findProjectById, insertProject, updateProjectById } from "../services";
import { sendSuccessResponse } from "../utils/successResponse";




export const createProject = async (req: customRequestWithPayload<{}, any, projectBody>, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload?.id;
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        await insertProject(userId, req.body);
        res.status(201).json(await sendSuccessResponse('new Project created', req.body));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const readProjectById = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const project = await findProjectById(id);
        if (!project) return next(new NotFoundError('No project found with given Id'));

        res.status(200).json(await sendSuccessResponse('Fetched details of project with given id', project));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const updateProject = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const isUpdated = await updateProjectById(id, req.body);
        if (!isUpdated) return next(new NotFoundError('not found any project to update'));

        res.status(200).json(await sendSuccessResponse('Project updated successfully', req.body));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const deleteProject = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const isDeleted = await deleteProjectById(id);
        if (!isDeleted) return next(new NotFoundError('not found any project to delete'));

        res.status(200).json(await sendSuccessResponse('Project deleted successfully'));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}