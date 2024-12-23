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
exports.updateUserById = exports.userExistsById = exports.findhashPasswordById = exports.findAllUsersByRole = exports.insertUser = exports.findRoleById = exports.deleteRefreshToken = exports.findUserById = exports.checkRefreshTokenExistsById = exports.userExistsByEmail = exports.updateRefreshToken = exports.findUserByEmail = void 0;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.Users.findOne({ email });
        if (!user)
            return null;
        const existingUser = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            refreshToken: user.refreshToken,
            hashPassword: user.hashPassword
        };
        return existingUser;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.findUserByEmail = findUserByEmail;
const updateRefreshToken = (_id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield models_1.Users.findByIdAndUpdate({ _id }, { refreshToken });
        yield (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.save());
        return;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.updateRefreshToken = updateRefreshToken;
const userExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield models_1.Users.exists({ email });
        return userExists ? true : false;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.userExistsByEmail = userExistsByEmail;
const checkRefreshTokenExistsById = (_id, RefreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.Users.findById({ _id });
        if (!user)
            return false;
        if (user.refreshToken == RefreshToken)
            return true;
        else
            return false;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        return false;
    }
});
exports.checkRefreshTokenExistsById = checkRefreshTokenExistsById;
const findUserById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.Users.findById({ _id });
        if (!user)
            return null;
        const existingUser = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
        };
        return existingUser;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.findUserById = findUserById;
const deleteRefreshToken = (_id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield models_1.Users.findByIdAndUpdate({ _id }, { $unset: { refreshToken: 1 } });
        yield (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.save());
        return;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.deleteRefreshToken = deleteRefreshToken;
const findRoleById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.Users.findById({ _id });
        if (!user)
            return null;
        return user.role;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.findRoleById = findRoleById;
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new models_1.Users({
            username: user.username,
            email: user.email,
            hashPassword: user.hashPassword,
            role: user.role
        });
        yield newUser.save();
        return;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.insertUser = insertUser;
const findAllUsersByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield models_1.Users.find({ role });
        const result = allUsers.map((user) => ({
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
        }));
        return result;
    }
    catch (error) {
        return [];
    }
});
exports.findAllUsersByRole = findAllUsersByRole;
const findhashPasswordById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.Users.findById({ _id });
        if (!user)
            return null;
        return user.hashPassword;
    }
    catch (error) {
        return null;
    }
});
exports.findhashPasswordById = findhashPasswordById;
const userExistsById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield models_1.Users.exists({ _id });
        return userExists ? true : false;
    }
    catch (error) {
        return false;
    }
});
exports.userExistsById = userExistsById;
const updateUserById = (_id, updateBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { updateEmail, updatePassword, updateUsername } = updateBody;
        const existingUser = yield models_1.Users.findById({ _id });
        if (!existingUser)
            return false;
        const hashPassword = updatePassword ? yield (0, config_1.getEncryptedPassword)(updatePassword) : existingUser.hashPassword;
        const updatedUser = yield models_1.Users.findByIdAndUpdate({ _id }, {
            username: updateUsername ? updateUsername : existingUser.username,
            hashPassword,
            email: updateEmail ? updateEmail : existingUser.email
        });
        if (!updatedUser)
            return false;
        yield updatedUser.save();
        return true;
    }
    catch (error) {
        logger_1.logger.error(error.message);
        throw new Error(error.message);
    }
});
exports.updateUserById = updateUserById;
