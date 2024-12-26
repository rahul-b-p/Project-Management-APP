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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccount = exports.updateUser = exports.deleteUserByAdmin = exports.updateUserByAdmin = exports.readUserDetails = exports.readUserById = exports.readAllUserDetails = exports.readAllUsers = exports.createUser = void 0;
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
const readAllUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllUsers = yield (0, services_1.getAllUsersWithProjects)();
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)(`Fetched all users with added  project data`, AllUsers));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.readAllUserDetails = readAllUserDetails;
const readUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, services_1.getUserWithProjects)(id);
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
const readUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            throw new Error('The user ID was not added to the payload by the authentication middleware.');
        const user = yield (0, services_1.getUserWithProjects)(id);
        if (!user)
            return next(new errors_1.NotFoundError('User not Found with given id'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('User details fetched', user));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.readUserDetails = readUserDetails;
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
const deleteUserByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isDeleted = yield (0, services_1.deleteAccountById)(id);
        if (!isDeleted)
            return next(new errors_1.NotFoundError('User not found to delete'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('User deleted successfully'));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.deleteUserByAdmin = deleteUserByAdmin;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _b = req.body, { currentPassword } = _b, updateUserContent = __rest(_b, ["currentPassword"]);
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            throw new Error('not get the id stored on payload on auth middleware');
        const hashPassword = yield (0, services_1.findhashPasswordById)(id);
        if (!hashPassword)
            return next(new errors_1.AuthenticationError('Requested By an Invalid User'));
        const isValidPassword = yield (0, config_1.verifyPassword)(currentPassword, hashPassword);
        if (!isValidPassword)
            return next(new errors_1.AuthenticationError('Invalid Password'));
        const isUpdated = yield (0, services_1.updateUserById)(id, updateUserContent);
        if (!isUpdated)
            return next(new errors_1.NotFoundError('User not Found'));
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('User details updated'));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.updateUser = updateUser;
const deleteUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            throw new Error('The user ID was not added to the payload by the authentication middleware.');
        logger_1.logger.info(id);
        const isDeleted = yield (0, services_1.deleteAccountById)(id);
        if (!isDeleted)
            return next(new errors_1.NotFoundError('User Data not found!!'));
        const AccessToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!AccessToken)
            throw new Error('AccessToken missed from header after auth middleware');
        yield (0, config_1.blackListToken)(AccessToken);
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Account deleted successfully.'));
    }
    catch (error) {
    }
});
exports.deleteUserAccount = deleteUserAccount;
