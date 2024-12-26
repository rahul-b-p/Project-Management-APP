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
exports.deleteAccountById = void 0;
const logger_1 = require("../utils/logger");
const project_service_1 = require("./project.service");
const user_service_1 = require("./user.service");
const deleteAccountById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserDeleted = yield (0, user_service_1.deleteUserById)(id);
        if (!isUserDeleted)
            return false;
        yield (0, project_service_1.deleteProjectByUserId)(id);
        return true;
    }
    catch (error) {
        logger_1.logger.error('Error fetching user with projects:', error);
        throw error;
    }
});
exports.deleteAccountById = deleteAccountById;
