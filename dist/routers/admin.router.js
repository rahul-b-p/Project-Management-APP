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
// read all admins /users
exports.router.get('/read/:role', controllers_1.readAllUsers);
// read user by id
exports.router.get('/read-user/:id', controllers_1.readUserById);
// update user by id
exports.router.put('/update-user/:id', (0, middlewares_1.validateRequest)(schemas_1.updateUserByIdSchema), controllers_1.updateUserByAdmin);
