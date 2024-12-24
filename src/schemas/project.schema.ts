import { z } from "zod";



export const projectSchema=z.object({
    projectName:z.string({message:'projectName is required'}).min(3,{message:'atleast add 3 characters for projectname'}),
    description: z.string({ message: 'description is required' }).min(5, { message: 'atleast add 5 characters for description' })
});

export const updateProjectSchema = z.object({
    updateProjectName: z.string().min(3, { message: 'atleast add 3 characters for projectname' }).optional(),
    updateDescription: z.string().min(5, { message: 'atleast add 5 characters for description' }).optional()
}).refine(
    (data) => data.updateProjectName || data.updateDescription,
    {
        message: "At least one of 'projectName' or 'description' must be provided.",
        path: [],
    }
);
