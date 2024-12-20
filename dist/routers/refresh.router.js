"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
exports.router.post('/', middlewares_1.refreshTokenAuth, controllers_1.refreshToken);
