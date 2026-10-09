import mongoose from "mongoose";
import {
    TaskModel,
    TaskStatus,
} from "../models/taskModels";
import {
    CreateTaskInput,
    UpdateTaskInput,
} from "../validators/taskValidator";
import { AppError } from "../errors/AppError";

export const createTask = async (input: CreateTaskInput) => {
    const task = await TaskModel.create({
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
    });
    return task;
};

export const getTasks = async (status?: TaskStatus) => {
    const filter = status ? { status } : {};
    const tasks = await TaskModel.find(filter).sort({ createdAt: -1, }).lean();
    return tasks;
};

export const updateTaskStatus = async (
    taskId: string,
    input: UpdateTaskInput
) => {
    if (!mongoose.isValidObjectId(taskId)) {
        throw new AppError("Invalid task ID.", 400);
    }
    const task = await TaskModel.findByIdAndUpdate(
        taskId,
        {
            $set: {
                status: input.status,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );
    if (!task) {
        throw new AppError("Task not found.", 404);
    }
    return task;
};

export const deleteTask = async (taskId: string): Promise<void> => {
    if (!mongoose.isValidObjectId(taskId)) {
        throw new AppError("Invalid task ID.", 400);
    }
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
        throw new AppError("Task not found.", 404);
    }
};