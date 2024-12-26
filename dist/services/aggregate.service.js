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
exports.getUserWithProjects = void 0;
const project_service_1 = require("./project.service");
const user_service_1 = require("./user.service");
const getUserWithProjects = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.findUserById)(userId);
        if (!user) {
            return null;
        }
        const projects = yield (0, project_service_1.findProjectByUserId)(userId);
        return Object.assign(Object.assign({}, user), { projects });
    }
    catch (error) {
        console.error('Error fetching user with projects:', error);
        throw error;
    }
});
exports.getUserWithProjects = getUserWithProjects;
