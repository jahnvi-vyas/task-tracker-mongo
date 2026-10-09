import mongoose, { Document, Schema } from "mongoose";
export const TASK_STATUSES = [
    "TODO",
    "IN_PROGRESS",
    "DONE",
] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_PRIORITIES = [
    "LOW",
    "MEDIUM",
    "HIGH",
] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface ITask extends Document {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters.",],
        },

        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters.",],
        },

        status: {
            type: String,
            enum: {
                values: TASK_STATUSES,
                message: "Invalid task status.",
            },
            default: "TODO",
            required: true,
        },

        priority: {
            type: String,
            enum: {
                values: TASK_PRIORITIES,
                message: "Invalid task priority.",
            },
            default: "MEDIUM",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

taskSchema.index({ status: 1, createdAt: -1, });
taskSchema.index({ createdAt: -1, });
export const TaskModel = mongoose.model<ITask>("Task", taskSchema);