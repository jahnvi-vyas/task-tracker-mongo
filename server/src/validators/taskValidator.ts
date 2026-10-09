import { z } from "zod";

export const taskStatusSchema = z.enum([
    "TODO",
    "IN_PROGRESS",
    "DONE",
]);
export const taskPrioritySchema = z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
]);

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Title is required.").max(100, "Title cannot exceed 100 characters."),
    description: z.string().trim().max(1000, "Description cannot exceed 1000 characters.").optional(),
    status: taskStatusSchema.default("TODO"),
    priority: taskPrioritySchema.default("MEDIUM"),
});

export const updateTaskSchema = z.object({ status: taskStatusSchema, }).strict();
export const taskIdSchema = z.object({ id: z.string().min(1, "Task ID is required."), });
export const taskQuerySchema = z.object({ status: taskStatusSchema.optional(), });
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>;