import {
    Empty,
} from "antd";
import type { Task, TaskStatus } from "../../types/task";
import TaskItemComponent from '../TaskItemComponent';
import "./index.css";

interface TaskListComponentProps {
    tasks: Task[];
    onStatusChange: (
        taskId: string,
        status: TaskStatus
    ) => Promise<void>;
    onDelete: (taskId: string) => Promise<void>;
    updatingTaskId?: string | null;
    deletingTaskId?: string | null;
}

const TaskListComponent = ({
    tasks,
    onStatusChange,
    onDelete,
    updatingTaskId = null,
    deletingTaskId = null,
}: TaskListComponentProps) => {
    if (tasks.length === 0) {
        return (
            <div className="task-list__empty">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No tasks found"
                />
            </div>
        );
    }
    return (
        <section className="task-list" aria-label="Task list">
            {tasks.map((task) => (
                <TaskItemComponent
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    isUpdating={updatingTaskId === task.id}
                    isDeleting={deletingTaskId === task.id}
                />
            ))}
        </section>
    );
};

export default TaskListComponent;