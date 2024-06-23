import { z } from "zod";

const draftSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }).max(100, {
        message: "Maximum 100 characters allowed"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }).max(5000, {
        message: "Maximum 5000 characters allowed"
    }),
    category: z.string().optional(),
    keywords: z.string().optional(),
    privacy: z.string().optional(),
    //File validation for content
    content: z.string().optional(),
})


export default draftSchema;

export type draftSchemaType = z.infer<typeof draftSchema>;
