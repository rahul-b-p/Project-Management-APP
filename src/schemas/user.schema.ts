import { z } from "zod";



export const updateUserSchema = z.object({
    currentPassword: z.string({ message: "Current password is required." }).min(6, { message: "Current password must be at least 6 characters long." }),
    updateUsername: z.string().min(3, { message: "Username must be at least 5 characters long." }).optional(),
    updateEmail: z.string().email({ message: "Must be a valid email address." }).optional(),
    updatePassword: z.string().min(6, { message: "Password must be at least 6 characters long." }).optional(),
}).refine(
    (data) => data.updateUsername || data.updateEmail || data.updatePassword,
    {
        message: "At least one of 'updateUsername', 'updateEmail', or 'updatePassword' must be provided.",
        path: [],
    }
);



export const updateUserByIdSchema = z.object({
    updateUsername: z.string().min(3, { message: "Username must be at least 5 characters long." }).optional(),
    updateEmail: z.string().email({ message: "Must be a valid email address." }).optional(),
    updatePassword: z.string().min(6, { message: "Password must be at least 6 characters long." }).optional(),
}).refine(
    (data) => data.updateUsername || data.updateEmail || data.updatePassword,
    {
        message: "At least one of 'updateUsername', 'updateEmail', or 'updatePassword' must be provided.",
        path: [],
    }
);