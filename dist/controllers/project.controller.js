"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProjectsByUser = exports.deleteProject = exports.updateProject = exports.readAllProjectsByUser = exports.readProjectById = exports.createProject = void 0;
const logger_1 = require("../utils/logger");
const errors_1 = require("../errors");
const services_1 = require("../services");
const successResponse_1 = require("../utils/successResponse");
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            throw new Error('The user ID was not added to the payload by the authentication middleware.');
        yield (0, services_1.insertProject)(userId, req.body);
        res.status(201).json(yield (0, successResponse_1.sendSuccessResponse)('new Project created', req.body));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.createProject = createProject;
const readProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield (0, services_1.findProjectById)(id);
        if (!project)
            return next(new errors_1.NotFoundError('No project found with given Id'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Fetched details of project with given id', project));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.readProjectById = readProjectById;
const readAllProjectsByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            throw new Error('The user ID was not added to the payload by the authentication middleware.');
        const projects = yield (0, services_1.findProjectByUserId)(userId);
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('fetched all projects added by user', projects));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.readAllProjectsByUser = readAllProjectsByUser;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isUpdated = yield (0, services_1.updateProjectById)(id, req.body);
        if (!isUpdated)
            return next(new errors_1.NotFoundError('not found any project to update'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Project updated successfully', req.body));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isDeleted = yield (0, services_1.deleteProjectById)(id);
        if (!isDeleted)
            return next(new errors_1.NotFoundError('not found any project to delete'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Project deleted successfully'));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.deleteProject = deleteProject;
const deleteAllProjectsByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            throw new Error('The user ID was not added to the payload by the authentication middleware.');
        yield (0, services_1.deleteProjectByUserId)(userId);
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('deleted all projects added by User'));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.deleteAllProjectsByUser = deleteAllProjectsByUser;
