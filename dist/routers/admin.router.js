"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
// read all signup requests
exports.router.get('/read-signup-reqs', controllers_1.readAllSignupRequest);
// approving signup request and saving users
exports.router.patch('/approve-signup/:id', controllers_1.approveSignupRequest);
// delete signup request
exports.router.delete('/delete-signup-req/:id', controllers_1.deleteSignupRequest);
