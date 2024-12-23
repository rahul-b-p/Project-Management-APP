"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const Projects = (0, mongoose_1.model)('Projects', projectSchema);
exports.default = Projects;
