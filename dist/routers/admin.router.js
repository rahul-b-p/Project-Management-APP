"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
exports.router = (0, express_1.Router)();
// read all signup requests
exports.router.get('/read-signup-reqs', controllers_1.readAllSignupRequest);
// approving signup request and saving users
exports.router.patch('/approve-signup/:id', controllers_1.approveSignupRequest);
// delete signup request
exports.router.delete('/delete-signup-req/:id', controllers_1.deleteSignupRequest);
// create new admin/user by specified parameter
exports.router.post('/create/:role', (0, middlewares_1.validateRequest)(schemas_1.signupSchema), controllers_1.createUser);
