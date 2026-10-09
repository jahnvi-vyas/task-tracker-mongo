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

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
}

export interface UpdateTaskStatusPayload {
    status: TaskStatus;
}

export interface ApiSuccess<T> {
    success: true;
    data: T;
}

export interface ApiErrorResponse {
    success: false;
    error: {
        message: string;
        details?: unknown;
    };
}

export type ApiResponse<T> = | ApiSuccess<T> | ApiErrorResponse;