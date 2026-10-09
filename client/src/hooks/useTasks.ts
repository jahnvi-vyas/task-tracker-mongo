import {
    useCallback,
    useEffect,
    useState,
} from "react";
import { notification } from "antd";
import {
    createTask,
    deleteTask,
    getTasks,
    updateTaskStatus,
} from "../services/taskApi";
import type {
    CreateTaskPayload,
    Task,
    TaskStatus,
} from "../types/task";
import type { FilterValue } from "../components/FilterComponent";

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterValue>("ALL");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isCreateDrawerOpen, setIsCreateDrawerOpen,] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const loadTasks = useCallback(async (selectedFilter: FilterValue = "ALL"): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            const status = selectedFilter === "ALL" ? undefined : selectedFilter;
            const data = await getTasks(status);
            setTasks(data);
        } catch (requestError) {
            const message = requestError instanceof Error
                ? requestError.message
                : "Unable to load tasks.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadTasks("ALL");
    }, [loadTasks]);

    const handleFilterChange = (value: FilterValue): void => {
        setFilter(value);
        void loadTasks(value);
    };

    const handleOpenCreateDrawer = (): void => {
        setError(null);
        setIsCreateDrawerOpen(true);
    };

    const handleCloseCreateDrawer = (): void => {
        if (isCreating) {
            return;
        }
        setIsCreateDrawerOpen(false);
    };

    const handleCreateTask = async (payload: CreateTaskPayload): Promise<void> => {
        try {
            setIsCreating(true);
            setError(null);
            const createdTask = await createTask(payload);
            const shouldDisplay = filter === "ALL" || createdTask.status === filter;
            if (shouldDisplay) {
                setTasks((currentTasks) => [
                    createdTask,
                    ...currentTasks,
                ]);
            }
            setIsCreateDrawerOpen(false);
            api.success({
                message: "Task created",
                description: "The task was created successfully.",
                placement: "topRight",
            });
        } catch (requestError) {
            const message = requestError instanceof Error
                ? requestError.message
                : "Unable to create task.";

            setError(message);
            throw requestError;
        } finally {
            setIsCreating(false);
        }
    };

    const handleStatusChange = async (
        taskId: string,
        status: TaskStatus
    ): Promise<void> => {
        try {
            setError(null);
            const updatedTask = await updateTaskStatus(
                taskId,
                status
            );
            if (filter !== "ALL" && updatedTask.status !== filter) {
                setTasks((currentTasks) =>
                    currentTasks.filter(
                        (task) =>
                            task.id !== taskId
                    )
                );
            } else {
                setTasks((currentTasks) =>
                    currentTasks.map((task) =>
                        task.id === taskId ? updatedTask : task
                    )
                );
            }
            api.success({
                message: "Status updated",
                description: "Task status was updated successfully.",
                placement: "topRight",
            });
        } catch (requestError) {
            const message = requestError instanceof Error
                ? requestError.message
                : "Unable to update task.";

            setError(message);
        }
    };

    const handleDeleteTask = async (taskId: string): Promise<void> => {
        try {
            setError(null);
            await deleteTask(taskId);
            setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== taskId)
            );
            api.success({
                message: "Task deleted",
                description: "The task was deleted successfully.",
                placement: "topRight",
            });
        } catch (requestError) {
            const message = requestError instanceof Error
                ? requestError.message
                : "Unable to delete task.";
            setError(message);
        }
    };

    return {
        tasks,
        filter,
        isLoading,
        error,
        isCreating,
        isCreateDrawerOpen,
        contextHolder,
        loadTasks,
        handleFilterChange,
        handleOpenCreateDrawer,
        handleCloseCreateDrawer,
        handleCreateTask,
        handleStatusChange,
        handleDeleteTask,
    };
};

export default useTasks;