import { useState, type FormEvent } from "react";
import {
    TASK_PRIORITIES,
    TASK_STATUSES,
    type CreateTaskPayload,
    type TaskPriority,
    type TaskStatus,
} from "../../types/task";
import SelectComponent from '../common/SelectComponent';
import ButtonComponent from '../common/ButtonComponent';
import InputComponent from '../common/InputComponent';
import "./index.css";

interface TaskFormComponentProps {
    onSubmit: (payload: CreateTaskPayload) => Promise<void>;
    loading?: boolean;
}

interface FormErrors {
    title?: string;
    description?: string;
}

const TaskFormComponent = ({
    onSubmit,
    loading = false,
}: TaskFormComponentProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TaskStatus>("TODO");
    const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const nextErrors: FormErrors = {};
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            nextErrors.title = "Task title is required.";
        } else if (trimmedTitle.length > 100) {
            nextErrors.title = "Task title cannot exceed 100 characters.";
        }
        if (description.length > 1000) {
            nextErrors.description = "Description cannot exceed 1000 characters.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const payload: CreateTaskPayload = {
            title: title.trim(),
            status,
            priority,
            ...(description.trim()
                ? { description: description.trim() }
                : {}),
        };
        await onSubmit(payload);
        setTitle("");
        setDescription("");
        setStatus("TODO");
        setPriority("MEDIUM");
        setErrors({});
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (errors.title) {
            setErrors((current) => ({
                ...current,
                title: undefined,
            }));
        }
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        if (errors.description) {
            setErrors((current) => ({
                ...current,
                description: undefined,
            }));
        }
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="task-form__header">
                <div>
                    <h2 className="task-form__title">
                        Create New Task
                    </h2>
                    <p className="task-form__subtitle">
                        Add a task with priority and status.
                    </p>
                </div>
            </div>
            <div className="task-form__body">
                <InputComponent
                    label="Task title"
                    placeholder="e.g. Implement authentication flow"
                    value={title}
                    maxLength={100}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    error={errors.title}
                    disabled={loading}
                />
                <InputComponent
                    label="Description"
                    placeholder="Add additional details about this task..."
                    value={description}
                    maxLength={1000}
                    showCount
                    onChange={(event) => handleDescriptionChange(event.target.value)}
                    error={errors.description}
                    disabled={loading}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SelectComponent
                        label="Status"
                        value={status}
                        onChange={(value) => setStatus(value as TaskStatus)}
                        disabled={loading}
                        options={TASK_STATUSES.map(
                            (taskStatus) => ({
                                value: taskStatus,
                                label: taskStatus === "TODO"
                                    ? "To Do"
                                    : taskStatus === "IN_PROGRESS" ? "In Progress" : "Done",
                            })
                        )}
                    />
                    <SelectComponent
                        label="Priority"
                        value={priority}
                        onChange={(value) => setPriority(value as TaskPriority)}
                        disabled={loading}
                        options={TASK_PRIORITIES.map(
                            (taskPriority) => ({
                                value: taskPriority,
                                label: taskPriority.charAt(0) + taskPriority.slice(1).toLowerCase(),
                            })
                        )}
                    />
                </div>
            </div>
            <div className="task-form__footer">
                <ButtonComponent
                    type="submit"
                    variant="primary"
                    size="large"
                    loading={loading}
                >
                    Create Task
                </ButtonComponent>
            </div>
        </form>
    );
};

export default TaskFormComponent;