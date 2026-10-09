import { CheckSquareOutlined } from "@ant-design/icons";
import ButtonComponent from '../common/ButtonComponent';
import "./index.css";

interface EmptyComponentProps {
    onCreateTask?: () => void;
    hasFilter?: boolean;
}

const EmptyComponent = ({
    onCreateTask,
    hasFilter = false,
}: EmptyComponentProps) => {
    return (
        <div
            className="empty-state"
            role="status"
        >
            <div className="empty-state__icon">
                <CheckSquareOutlined />
            </div>
            <h3 className="empty-state__title">
                {hasFilter ? "No matching tasks" : "No tasks yet"}
            </h3>
            <p className="empty-state__description">
                {hasFilter
                    ? "Try changing the status filter to find other tasks."
                    : "Create your first task to start managing your work."}
            </p>
            {!hasFilter && onCreateTask && (
                <ButtonComponent
                    variant="primary"
                    onClick={onCreateTask}
                >
                    Create your first task
                </ButtonComponent>
            )}
        </div>
    );
};

export default EmptyComponent;