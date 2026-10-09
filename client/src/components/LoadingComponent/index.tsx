import { Spin } from "antd";
import "./index.css";

interface LoadingStateProps {
    message?: string;
}

const LoadingComponent = ({
    message = "Loading tasks...",
}: LoadingStateProps) => {
    return (
        <div
            className="loading-state"
            role="status"
            aria-live="polite"
        >
            <Spin size="large" />
            <span className="loading-state__message">
                {message}
            </span>
        </div>
    );
};

export default LoadingComponent;