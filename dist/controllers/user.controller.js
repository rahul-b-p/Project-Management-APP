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
exports.updateUserByAdmin = exports.readUserById = exports.readAllUsers = exports.createUser = void 0;
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
const errors_1 = require("../errors");
const services_1 = require("../services");
const config_1 = require("../config");
const successResponse_1 = require("../utils/successResponse");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.params;
        const { email, password, username } = req.body;
        if (role !== types_1.roles.user && role !== types_1.roles.admin)
            return next(new errors_1.BadRequestError('Requested to create an Invalid role'));
        const isUserExists = yield (0, services_1.userExistsByEmail)(email);
        if (isUserExists)
            return next(new errors_1.ConflictError("Email already in use. Please use a different email."));
        const hashPassword = yield (0, config_1.getEncryptedPassword)(password);
        const userToInsert = {
            username, email, hashPassword, role
        };
        yield (0, services_1.insertUser)(userToInsert);
        res.status(201).json(yield (0, successResponse_1.sendSuccessResponse)(`New ${role} cretaed`, { username, email }));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.createUser = createUser;
const readAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.params;
        if (role !== types_1.roles.user && role !== types_1.roles.admin)
            return next(new errors_1.BadRequestError('Requested to fetch users of role'));
        const AllUsers = yield (0, services_1.findAllUsersByRole)(role);
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)(`Fetched all ${role}s`, AllUsers));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.readAllUsers = readAllUsers;
const readUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, services_1.findUserById)(id);
        if (!user)
            return next(new errors_1.NotFoundError('User not Found with given id'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('User details fetched', user));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.readUserById = readUserById;
const updateUserByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { updateEmail, updateUsername } = req.body;
        const isUserExistS = yield (0, services_1.userExistsById)(id);
        if (!isUserExistS)
            return next(new errors_1.NotFoundError('User not Found with given id'));
        const isUpdated = yield (0, services_1.updateUserById)(id, req.body);
        if (!isUpdated)
            return next(new errors_1.NotFoundError('User not Found with given id'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Updated userwith given id', { id, updateUsername, updateEmail }));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.updateUserByAdmin = updateUserByAdmin;
