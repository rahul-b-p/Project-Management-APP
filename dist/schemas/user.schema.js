"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByIdSchema = exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    currentPassword: zod_1.z.string({ message: "Current password is required." }).min(6, { message: "Current password must be at least 6 characters long." }),
    updateUsername: zod_1.z.string().min(3, { message: "Username must be at least 5 characters long." }).optional(),
    updateEmail: zod_1.z.string().email({ message: "Must be a valid email address." }).optional(),
    updatePassword: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long." }).optional(),
}).refine((data) => data.updateUsername || data.updateEmail || data.updatePassword, {
    message: "At least one of 'updateUsername', 'updateEmail', or 'updatePassword' must be provided.",
    path: [],
});
exports.updateUserByIdSchema = zod_1.z.object({
    updateUsername: zod_1.z.string().min(3, { message: "Username must be at least 5 characters long." }).optional(),
    updateEmail: zod_1.z.string().email({ message: "Must be a valid email address." }).optional(),
    updatePassword: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long." }).optional(),
}).refine((data) => data.updateUsername || data.updateEmail || data.updatePassword, {
    message: "At least one of 'updateUsername', 'updateEmail', or 'updatePassword' must be provided.",
    path: [],
});
