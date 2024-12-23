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
exports.deleteSignupRequestById = exports.findSignupRequestById = exports.findAllSignupRequests = exports.insertSignupRequest = exports.signupRequestExistsByEmail = void 0;
const config_1 = require("../config");
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
const signupRequestExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestExists = yield models_1.SignupRequests.exists({ email });
        return requestExists ? true : false;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.signupRequestExistsByEmail = signupRequestExistsByEmail;
const insertSignupRequest = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = userBody;
        const hashPassword = yield (0, config_1.getEncryptedPassword)(password);
        const newRequest = new models_1.SignupRequests({
            username, email, hashPassword
        });
        yield newRequest.save();
        return;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.insertSignupRequest = insertSignupRequest;
const findAllSignupRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSignupRequests = yield models_1.SignupRequests.find();
        const result = allSignupRequests.map((request) => ({
            _id: request._id.toString(),
            username: request.username,
            email: request.email,
        }));
        return result;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.findAllSignupRequests = findAllSignupRequests;
const findSignupRequestById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signupRequest = yield models_1.SignupRequests.findById({ _id });
        if (!signupRequest)
            return null;
        const result = {
            username: signupRequest.username,
            email: signupRequest.email,
            hashPassword: signupRequest.hashPassword
        };
        return result;
    }
    catch (error) {
        return null;
    }
});
exports.findSignupRequestById = findSignupRequestById;
const deleteSignupRequestById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.SignupRequests.findByIdAndDelete({ _id });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.deleteSignupRequestById = deleteSignupRequestById;
