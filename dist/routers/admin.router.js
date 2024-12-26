"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
// read all signup requests
exports.router.get('/read-signup-reqs', controllers_1.signUpRequestController.readAllSignupRequest);
// approving signup request and saving users
exports.router.patch('/approve-signup/:id', controllers_1.signUpRequestController.approveSignupRequest);
// delete signup request
exports.router.delete('/delete-signup-req/:id', controllers_1.signUpRequestController.deleteSignupRequest);
// create new admin/user by specified parameter
exports.router.post('/create/:role', (0, middlewares_1.validateRequest)(schemas_1.signupSchema), controllers_1.userController.createUser);
// read all admins /users
exports.router.get('/read/:role', controllers_1.userController.readAllUsers);
// read user by id
exports.router.get('/read-user/:id', controllers_1.userController.readUserById);
// update user
exports.router.put('/update-user/:id', (0, middlewares_1.validateRequest)(schemas_1.updateUserByIdSchema), controllers_1.userController.updateUserByAdmin);
// delete user
exports.router.delete('/delete-user/:id', controllers_1.userController.deleteUserByAdmin);
// read all user with projects
exports.router.get('/read-all', controllers_1.userController.readAllUserDetails);
