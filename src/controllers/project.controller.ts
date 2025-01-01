import { NextFunction, Response } from "express";
import { customRequestWithPayload, projectBody, roles } from "../types";
import { logger } from "../utils/logger";
import { InternalServerError, NotFoundError } from "../errors";
import { deleteProjectById, deleteProjectByUserId, findProjectById, findProjectByUserId, findRoleById, insertProject, projectExistById, updateProjectById, userExistsById, validateProjectOwner } from "../services";
import { sendSuccessResponse } from "../utils/successResponse";
import { ForbiddenError } from "../errors/forbidden.error";




export const createProject = async (req: customRequestWithPayload<{}, any, projectBody>, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload?.id;
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const newProject = await insertProject(userId, req.body);
        res.status(201).json(await sendSuccessResponse('new Project created', newProject));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const createProjectForUser = async (req: customRequestWithPayload<{ userId: string }, any, projectBody>, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const isValidUser = await userExistsById(userId);
        if (!isValidUser) return next(new NotFoundError('User not found to add a new project'));

        const newProject = await insertProject(userId, req.body);
        res.status(201).json(await sendSuccessResponse('new Project created', newProject));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const readProjectById = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const userId = req.payload?.id
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const role = await findRoleById(userId);
        if (!role) throw new Error('Some error has happended while adding or reading the role');

        if (role == roles.user) {
            const isValidUser = await validateProjectOwner(userId, id);
            if (!isValidUser) return next(new ForbiddenError('User has no permision to edit the requested project'));
        }

        const project = await findProjectById(id);
        if (!project) return next(new NotFoundError('No project found with given Id'));

        res.status(200).json(await sendSuccessResponse('Fetched details of project with given id', project));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const readAllProjectsByUser = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload?.id;
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const projects = await findProjectByUserId(userId);
        res.status(200).json(await sendSuccessResponse('fetched all projects added by user', projects));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const updateProject = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const isProjectExists = await projectExistById(id);
        if (!isProjectExists) return next(new NotFoundError('Not Found any project with given Id'));
        const userId = req.payload?.id
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const role = await findRoleById(userId);
        if (!role) throw new Error('Some error has happended while adding or reading the role');

        if (role == roles.user) {
            const isValidUser = await validateProjectOwner(userId, id);
            if (!isValidUser) return next(new ForbiddenError('User has no permision to edit the requested project'));
        }

        const isUpdated = await updateProjectById(id, req.body);
        if (!isUpdated) return next(new NotFoundError('not found any project to update'));

        res.status(200).json(await sendSuccessResponse('Project updated successfully', isUpdated));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const deleteProject = async (req: customRequestWithPayload<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const isProjectExists = await projectExistById(id);
        if (!isProjectExists) return next(new NotFoundError('Not Found any project with given Id'));

        const userId = req.payload?.id
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        const role = await findRoleById(userId);
        if (!role) throw new Error('Some error has happended while adding or reading the role');

        if (role == roles.user) {
            const isValidUser = await validateProjectOwner(userId, id);
            if (!isValidUser) return next(new ForbiddenError('User has no permision to edit the requested project'));
        }

        const isDeleted = await deleteProjectById(id);
        if (!isDeleted) return next(new NotFoundError('not found any project to delete'));

        res.status(200).json(await sendSuccessResponse('Project deleted successfully'));
    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}

export const deleteAllProjectsByUser = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload?.id;
        if (!userId) throw new Error('The user ID was not added to the payload by the authentication middleware.');

        await deleteProjectByUserId(userId);
        res.status(200).json(await sendSuccessResponse('deleted all projects added by User'));

    } catch (error) {
        logger.error(error);
        next(new InternalServerError('Something went wrong'));
    }
}