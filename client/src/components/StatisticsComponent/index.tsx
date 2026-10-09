import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import type { Task } from "../../types/task";
import "./index.css";

interface StatisticsProps {
    tasks: Task[];
}

const StatisticsComponent = ({ tasks }: StatisticsProps) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "DONE").length;
    const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length;
    const todoTasks = tasks.filter((task) => task.status === "TODO").length;

    return (
        <section className="stats-grid">
            <div className="stat-card stat-card--blue">
                <div className="stat-top">
                    <span className="stat-label">
                        Total Tasks
                    </span>
                    <div className="stat-icon">
                        <UnorderedListOutlined />
                    </div>
                </div>
                <div className="stat-value">
                    {totalTasks}
                </div>
            </div>
            <div className="stat-card stat-card--yellow">
                <div className="stat-top">
                    <span className="stat-label">
                        In Progress
                    </span>
                    <div className="stat-icon">
                        <ClockCircleOutlined />
                    </div>
                </div>
                <div className="stat-value">
                    {inProgressTasks}
                </div>
            </div>
            <div className="stat-card stat-card--green">
                <div className="stat-top">
                    <span className="stat-label">
                        Completed
                    </span>
                    <div className="stat-icon">
                        <CheckCircleOutlined />
                    </div>
                </div>
                <div className="stat-value">
                    {completedTasks}
                </div>
            </div>
            <div className="stat-card stat-card--purple">
                <div className="stat-top">
                    <span className="stat-label">
                        To Do
                    </span>
                    <div className="stat-icon">
                        <ClockCircleOutlined />
                    </div>
                </div>
                <div className="stat-value">
                    {todoTasks}
                </div>
            </div>
        </section>
    );
};

export default StatisticsComponent;