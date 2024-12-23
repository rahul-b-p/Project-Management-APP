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
exports.approveSignupRequest = exports.readAllSignupRequest = void 0;
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
const errors_1 = require("../errors");
const services_1 = require("../services");
const successResponse_1 = require("../utils/successResponse");
const readAllSignupRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSignupRequests = yield (0, services_1.findAllSignupRequests)();
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Fetched all signup requests', allSignupRequests));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.readAllSignupRequest = readAllSignupRequest;
const approveSignupRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingSignupRequest = yield (0, services_1.findSgnupRequestById)(id);
        if (!existingSignupRequest)
            return next(new errors_1.BadRequestError('Invalid signup request ID.'));
        yield (0, services_1.insertUser)(existingSignupRequest, types_1.roles.user);
        yield (0, services_1.deleteSignupRequestById)(id);
        const { username, email } = existingSignupRequest;
        res.status(201).json(yield (0, successResponse_1.sendSuccessResponse)('User created successfully.', { username, email }));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.approveSignupRequest = approveSignupRequest;
