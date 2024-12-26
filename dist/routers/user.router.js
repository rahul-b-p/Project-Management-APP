"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
// readd user details
exports.router.get('/read', controllers_1.userController.readUserDetails);
// update user credentials
exports.router.put('/update', (0, middlewares_1.validateRequest)(schemas_1.updateUserSchema), controllers_1.userController.updateUser);
exports.router.delete('/delete', controllers_1.userController.deleteUserAccount);
// create project
exports.router.post('/create-project', (0, middlewares_1.validateRequest)(schemas_1.projectSchema), controllers_1.projectController.createProject);
// read Projects by Id
exports.router.get('/read-project/:id', controllers_1.projectController.readProjectById);
// read all projects by user
exports.router.get('/read-projects', controllers_1.projectController.readAllProjectsByUser);
// update Project
exports.router.put('/update-project/:id', (0, middlewares_1.validateRequest)(schemas_1.updateProjectSchema), controllers_1.projectController.updateProject);
// delete Project
exports.router.delete('/delete-Project/:id', controllers_1.projectController.deleteProject);
// delete all project
exports.router.delete('/deleteAll-project', controllers_1.projectController.deleteAllProjectsByUser);
