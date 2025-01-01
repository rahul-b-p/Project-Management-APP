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
exports.deleteProjectByUserId = exports.deleteProjectById = exports.updateProjectById = exports.findProjectByUserId = exports.findProjectById = exports.insertProject = exports.validateProjectOwner = exports.projectExistById = void 0;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
const projectExistById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectExists = yield models_1.Projects.exists({ _id });
        if (projectExists)
            return true;
        else
            return false;
    }
    catch (error) {
        return false;
    }
});
exports.projectExistById = projectExistById;
const validateProjectOwner = (userId, _id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProjectExists = yield models_1.Projects.exists({ _id, userId });
        return ProjectExists ? true : false;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.validateProjectOwner = validateProjectOwner;
const insertProject = (userId, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectName, description } = project;
        const newProject = new models_1.Projects({
            userId, projectName, description
        });
        yield newProject.save();
        return;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.insertProject = insertProject;
const findProjectById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield models_1.Projects.findById({ _id });
        if (!project)
            return null;
        const result = {
            _id: project._id,
            userId: project.userId.toString(),
            projectName: project.projectName,
            description: project.description,
            createAt: project.createAt
        };
        return result;
    }
    catch (error) {
        return null;
    }
});
exports.findProjectById = findProjectById;
const findProjectByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield models_1.Projects.find({ userId });
        const result = projects.map((project) => ({
            _id: project._id,
            userId: project.userId.toString(),
            projectName: project.projectName,
            description: project.description,
            createAt: project.createAt
        }));
        return result;
    }
    catch (error) {
        return [];
    }
});
exports.findProjectByUserId = findProjectByUserId;
const updateProjectById = (_id, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingProject = yield models_1.Projects.findById({ _id });
        if (!existingProject)
            return false;
        const { updateDescription, updateProjectName } = project;
        const updatedProject = yield models_1.Projects.findByIdAndUpdate({ _id }, {
            projectName: updateProjectName ? updateProjectName : existingProject.projectName,
            description: updateDescription ? updateDescription : existingProject.description
        });
        if (!updatedProject)
            return false;
        yield updatedProject.save();
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.updateProjectById = updateProjectById;
const deleteProjectById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteProject = yield models_1.Projects.findByIdAndDelete({ _id });
        if (!deleteProject)
            return false;
        else
            return true;
    }
    catch (error) {
        return false;
    }
});
exports.deleteProjectById = deleteProjectById;
const deleteProjectByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Projects.deleteMany({ userId });
        return;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.deleteProjectByUserId = deleteProjectByUserId;
