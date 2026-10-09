import FilterComponent, { type FilterValue } from "../FilterComponent";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import EmptyComponent from "../EmptyComponent";
import TaskListComponent from "../TaskListComponent";
import type { Task, TaskStatus } from "../../types/task";
import "./index.css";

interface TasksSectionProps {
    tasks: Task[];
    filter: FilterValue;
    isLoading: boolean;
    error: string | null;
    onFilterChange: (value: FilterValue) => void;
    onRetry: () => void;
    onCreateTask: () => void;
    onStatusChange: (
        taskId: string,
        status: TaskStatus
    ) => Promise<void>;
    onDelete: (taskId: string) => Promise<void>;
}

const getPageTitle = (filter: FilterValue): string => {
    switch (filter) {
        case "TODO":
            return "To Do Tasks";
        case "IN_PROGRESS":
            return "In Progress Tasks";
        case "DONE":
            return "Completed Tasks";
        default:
            return "All Tasks";
    }
};

const TasksSection = ({
    tasks,
    filter,
    isLoading,
    error,
    onFilterChange,
    onRetry,
    onCreateTask,
    onStatusChange,
    onDelete,
}: TasksSectionProps) => {
    return (
        <section className="tasks-section">
            <div className="tasks-header">
                <div className="tasks-title-wrapper">
                    <h2 className="tasks-title">
                        {getPageTitle(filter)}
                    </h2>
                    <p className="tasks-subtitle">
                        View and manage your current tasks.
                    </p>
                </div>
                <div className="tasks-actions">
                    <div className="filter-wrapper">
                        <span className="filter-label">
                            Filter
                        </span>
                        <FilterComponent
                            value={filter}
                            onChange={onFilterChange}
                        />
                    </div>
                </div>
            </div>
            <div className="tasks-content">
                {isLoading && <LoadingComponent />}
                {!isLoading && error && (
                    <ErrorComponent
                        message={error}
                        onRetry={onRetry}
                    />
                )}
                {!isLoading && !error && tasks.length === 0 && (
                    <EmptyComponent
                        onCreateTask={onCreateTask}
                    />
                )}
                {!isLoading && !error && tasks.length > 0 && (
                    <TaskListComponent
                        tasks={tasks}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                    />
                )}
            </div>
        </section>
    );
};

export default TasksSection;