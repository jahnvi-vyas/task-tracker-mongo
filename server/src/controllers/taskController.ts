import {
    Request,
    Response,
} from "express";
import {
    createTask,
    deleteTask,
    getTasks,
    updateTaskStatus,
} from "../services/taskService";
import {
    CreateTaskInput,
    TaskQueryInput,
    UpdateTaskInput,
} from "../validators/taskValidator";

export const createTaskController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const input = req.body as CreateTaskInput;
    const task = await createTask(input);
    res.status(201).json({
        success: true,
        data: task,
    });
};

export const getTasksController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const query = req.query as TaskQueryInput;
    const tasks = await getTasks(query.status);
    res.status(200).json({
        success: true,
        data: tasks,
    });
};

export const updateTaskStatusController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id }: any = req.params;
    const input = req.body as UpdateTaskInput;
    const task = await updateTaskStatus(id, input);
    res.status(200).json({
        success: true,
        data: task,
    });
};

export const deleteTaskController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id }: any = req.params;
    await deleteTask(id);
    res.status(204).send();
};