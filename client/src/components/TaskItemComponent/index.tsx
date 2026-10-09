import {
    DeleteOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {
    Dropdown,
    Tag,
    type MenuProps,
} from "antd";
import type {
    Task,
    TaskPriority,
    TaskStatus,
} from "../../types/task";
import { TASK_STATUSES } from "../../types/task";
import SelectComponent from '../common/SelectComponent';
import ButtonComponent from '../common/ButtonComponent';
import "./index.css";

interface TaskItemComponentProps {
    task: Task;
    onStatusChange: (
        taskId: string,
        status: TaskStatus
    ) => Promise<void>;
    onDelete: (taskId: string) => Promise<void>;
    isUpdating?: boolean;
    isDeleting?: boolean;
}

const getStatusLabel = (status: TaskStatus): string => {
    switch (status) {
        case "TODO":
            return "To Do";
        case "IN_PROGRESS":
            return "In Progress";
        case "DONE":
            return "Done";
        default:
            return status;
    }
};

const getPriorityLabel = (priority: TaskPriority): string => {
    return (
        priority.charAt(0) +
        priority.slice(1).toLowerCase()
    );
};

const getPriorityColor = (priority: TaskPriority): string => {
    switch (priority) {
        case "HIGH":
            return "error";
        case "MEDIUM":
            return "warning";
        case "LOW":
            return "success";
        default:
            return "default";
    }
};

const formatDate = (createdAt: string): string => {
    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    ).format(new Date(createdAt));
};

const TaskItemComponent = ({
    task,
    onStatusChange,
    onDelete,
    isUpdating = false,
    isDeleting = false,
}: TaskItemComponentProps) => {
    const menuItems: MenuProps["items"] = [
        {
            key: "delete",
            label: "Delete task",
            icon: <DeleteOutlined />,
            danger: true,
        },
    ];

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
        if (key === "delete") {
            void onDelete(task.id);
        }
    };

    return (
        <article className={`task-item ${task.status === "DONE" ? "task-item--completed" : ""}`}>
            <div className="task-item__content">
                <div className="task-item__main">
                    <div className="task-item__heading">
                        <h3 className="task-item__title">
                            {task.title}
                        </h3>
                        <Tag color={getPriorityColor(task.priority)}>
                            {getPriorityLabel(task.priority)}
                        </Tag>
                    </div>
                    {task.description && (
                        <p className="task-item__description">
                            {task.description}
                        </p>
                    )}
                    <div className="task-item__meta">
                        <span>
                            Created{" "}{formatDate(task.createdAt)}
                        </span>
                        <span className="task-item__dot">
                            •
                        </span>
                        <span>
                            {getStatusLabel(task.status)}
                        </span>
                    </div>
                </div>
                <div className="task-item__actions">
                    <SelectComponent
                        value={task.status}
                        disabled={isUpdating || isDeleting}
                        loading={isUpdating}
                        onChange={(value) =>
                            void onStatusChange(
                                task.id,
                                value as TaskStatus
                            )
                        }
                        options={TASK_STATUSES.map(
                            (status) => ({
                                value: status,
                                label: getStatusLabel(status),
                            })
                        )}
                    />
                    <Dropdown
                        menu={{
                            items: menuItems,
                            onClick: handleMenuClick,
                        }}
                        trigger={["click"]}
                    >
                        <ButtonComponent
                            type="button"
                            aria-label={`Actions for ${task.title}`}
                            disabled={isDeleting}
                        >
                            <MoreOutlined />
                        </ButtonComponent>
                    </Dropdown>
                </div>
            </div>
        </article>
    );
};

export default TaskItemComponent;