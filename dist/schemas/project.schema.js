"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    projectName: zod_1.z.string({ message: 'projectName is required' }).min(3, { message: 'atleast add 3 characters for projectname' }),
    description: zod_1.z.string({ message: 'description is required' }).min(5, { message: 'atleast add 5 characters for description' })
});
exports.updateProjectSchema = zod_1.z.object({
    updateProjectName: zod_1.z.string().min(3, { message: 'atleast add 3 characters for projectname' }).optional(),
    updateDescription: zod_1.z.string().min(5, { message: 'atleast add 5 characters for description' }).optional()
}).refine((data) => data.updateProjectName || data.updateDescription, {
    message: "At least one of 'projectName' or 'description' must be provided.",
    path: [],
});
