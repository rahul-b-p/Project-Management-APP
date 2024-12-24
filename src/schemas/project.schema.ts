import { z } from "zod";



export const projectSchema=z.object({
    projectName:z.string({message:'projectName is required'}).min(3,{message:'atleast add 3 characters for projectname'}),
    description: z.string({ message: 'description is required' }).min(5, { message: 'atleast add 5 characters for description' })
});