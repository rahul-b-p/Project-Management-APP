"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
// update user credentials
exports.router.put('/update', (0, middlewares_1.validateRequest)(schemas_1.updateUserSchema), controllers_1.userController.updateUser);
