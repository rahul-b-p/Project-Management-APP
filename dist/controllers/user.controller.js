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
exports.createUser = void 0;
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
