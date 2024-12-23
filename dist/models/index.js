"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupRequests = exports.Users = void 0;
var user_model_1 = require("./user.model");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return __importDefault(user_model_1).default; } });
var signupRequest_model_1 = require("./signupRequest.model");
Object.defineProperty(exports, "SignupRequests", { enumerable: true, get: function () { return __importDefault(signupRequest_model_1).default; } });
