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
exports.insertIntoPUser = exports.pUserExistsByEmail = void 0;
const config_1 = require("../config");
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
const pUserExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield models_1.SignupRequests.exists({ email });
        return userExists ? true : false;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.pUserExistsByEmail = pUserExistsByEmail;
const insertIntoPUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = userBody;
        const hashPassword = yield (0, config_1.getEncryptedPassword)(password);
        const newPUser = new models_1.SignupRequests({
            username, email, hashPassword
        });
        yield newPUser.save();
        return;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.insertIntoPUser = insertIntoPUser;
