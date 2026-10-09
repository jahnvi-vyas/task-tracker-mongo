import type {
    ApiResponse,
    CreateTaskPayload,
    Task,
    TaskStatus,
} from "../types/task";

const API_BASE_URL = process.env.BASE_URL || "http://localhost:5000";

class ApiRequestError extends Error {
    status: number;
    details?: unknown;
    constructor(
        message: string,
        status: number,
        details?: unknown
    ) {
        super(message);
        this.name = "ApiRequestError";
        this.status = status;
        this.details = details;
    }
}

const normalizeTask = (task: Task & { _id?: string; }): Task => {
    return {
        ...task,
        id: task.id ?? task._id ?? "",
    };
};

const request = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {
    let response: Response;
    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        }
        );
    } catch {
        throw new ApiRequestError(
            "Unable to connect to the server. Make sure the backend is running on port 5000.",
            0
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    let result: ApiResponse<T>;
    try {
        result = (await response.json()) as ApiResponse<T>;
    } catch {
        throw new ApiRequestError(
            `The server returned an invalid response. Status: ${response.status}`,
            response.status
        );
    }

    if (!response.ok) {
        if ("error" in result && result.error) {
            throw new ApiRequestError(
                result.error.message ||
                `Request failed with status ${response.status}`,
                response.status,
                result.error.details
            );
        }
        throw new ApiRequestError(
            `Request failed with status ${response.status}`,
            response.status
        );
    }

    if (!result.success) {
        throw new ApiRequestError(
            result.error?.message ||
            "Request failed.",
            response.status,
            result.error?.details
        );
    }
    return result.data;
};

export const getTasks = async (
    status?: TaskStatus
): Promise<Task[]> => {
    const searchParams = new URLSearchParams();
    if (status) {
        searchParams.set("status", status);
    }

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/tasks?${queryString}` : "/tasks";
    const data = await request<unknown>(endpoint);
    if (Array.isArray(data)) {
        return data.map((task) => normalizeTask(
            task as Task & { _id?: string }
        ));
    }

    if (data && typeof data === "object" && "tasks" in data &&
        Array.isArray((data as { tasks: unknown[] }).tasks)
    ) {
        return (
            data as { tasks: (Task & { _id?: string })[] }
        ).tasks.map(normalizeTask);
    }

    throw new ApiRequestError(
        "Invalid tasks response from server.",
        200,
        data
    );
};

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
    const data = await request<unknown>("/tasks", {
        method: "POST",
        body: JSON.stringify(payload),
    }
    );
    if (data && typeof data === "object" && "task" in data) {
        return normalizeTask(
            (data as {
                task: Task & { _id?: string };
            }).task
        );
    }
    return normalizeTask(
        data as Task & { _id?: string }
    );
};

export const updateTaskStatus = async (
    taskId: string,
    status: TaskStatus
): Promise<Task> => {
    const data = await request<unknown>(`/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
            status,
        }),
    }
    );
    if (data && typeof data === "object" && "task" in data) {
        return normalizeTask(
            (data as {
                task: Task & { _id?: string };
            }).task
        );
    }
    return normalizeTask(
        data as Task & { _id?: string }
    );
};

export const deleteTask = async (taskId: string): Promise<void> => {
    await request<void>(`/tasks/${taskId}`, {
        method: "DELETE",
    }
    );
};

export { ApiRequestError };