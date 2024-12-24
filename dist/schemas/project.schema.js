"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    projectName: zod_1.z.string({ message: 'projectName is required' }).min(3, { message: 'atleast add 3 characters for projectname' }),
    description: zod_1.z.string({ message: 'description is required' }).min(5, { message: 'atleast add 5 characters for description' })
});
