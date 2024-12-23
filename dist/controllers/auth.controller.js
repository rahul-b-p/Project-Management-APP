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
exports.logout = exports.refreshToken = exports.signup = exports.login = void 0;
const services_1 = require("../services");
const errors_1 = require("../errors");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const successResponse_1 = require("../utils/successResponse");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield (0, services_1.findUserByEmail)(email);
        if (!existingUser)
            return next(new errors_1.NotFoundError('User not found with given email id'));
        const isVerifiedPassword = yield (0, config_1.verifyPassword)(password, existingUser.hashPassword);
        if (!isVerifiedPassword)
            return next(new errors_1.AuthenticationError('Invalid Password'));
        const AccessToken = yield (0, config_1.signAccessToken)(existingUser._id.toString(), existingUser.role);
        const RefreshToken = yield (0, config_1.signRefreshToken)(existingUser._id.toString(), existingUser.role);
        yield (0, services_1.updateRefreshToken)(existingUser._id, RefreshToken);
        res.statusMessage = "Login Successful";
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Login Successful', { AccessToken, RefreshToken }));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.login = login;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        const isVerificationPending = yield (0, services_1.signupRequestExistsByEmail)(email);
        if (isVerificationPending)
            return next(new errors_1.ConflictError("Your signup request is already pending admin verification. Please wait up to 48 hours."));
        const isUserExists = yield (0, services_1.userExistsByEmail)(email);
        if (isUserExists)
            return next(new errors_1.ConflictError("Email already in use. Please use a different email."));
        yield (0, services_1.insertSignupRequest)(req.body);
        res.status(201).json(yield (0, successResponse_1.sendSuccessResponse)("Signup request submitted with a validity period of 48 hours. Users can resubmit a request if not verified within this timeframe.", { username, email }));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.signup = signup;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            throw new Error('The user ID was not added to the payload by the authentication middleware.');
        const existingUser = yield (0, services_1.findUserById)(id);
        if (!existingUser)
            return next(new errors_1.NotFoundError());
        const AccessToken = yield (0, config_1.signAccessToken)(existingUser._id.toString(), existingUser.role);
        const RefreshToken = yield (0, config_1.signRefreshToken)(existingUser._id.toString(), existingUser.role);
        yield (0, services_1.updateRefreshToken)(existingUser._id, RefreshToken);
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Token refreshed successfully', { AccessToken, RefreshToken }));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_a = req.payload) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            throw new Error('The user ID was not added to the payload by the authentication middleware.');
        const AccessToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!AccessToken)
            throw new Error('AccessToken missed from header after auth middleware');
        const existingUser = yield (0, services_1.findUserById)(id);
        if (!existingUser)
            return next(new errors_1.NotFoundError());
        yield (0, config_1.blackListToken)(AccessToken);
        if (existingUser.refreshToken) {
            yield (0, config_1.blackListToken)(existingUser.refreshToken);
            yield (0, services_1.deleteRefreshToken)(existingUser._id, existingUser.refreshToken);
        }
        res.status(200).json(yield (0, successResponse_1.sendSuccessResponse)('Logged out successfully.'));
    }
    catch (error) {
        logger_1.logger.error(error);
        next(new errors_1.InternalServerError('Something went wrong'));
    }
});
exports.logout = logout;
