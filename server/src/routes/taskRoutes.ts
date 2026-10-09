import { Router } from "express";
import {
    createTaskController,
    deleteTaskController,
    getTasksController,
    updateTaskStatusController,
} from "../controllers/taskController";
import {
    createTaskSchema,
    taskIdSchema,
    taskQuerySchema,
    updateTaskSchema,
} from "../validators/taskValidator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post("/", validateRequest({
    body: createTaskSchema,
}), createTaskController);

router.get("/", validateRequest({
    query: taskQuerySchema,
}), getTasksController);

router.patch("/:id", validateRequest({
    params: taskIdSchema,
    body: updateTaskSchema,
}), updateTaskStatusController);

router.delete("/:id", validateRequest({
    params: taskIdSchema,
}), deleteTaskController);

export default router;