import { Alert } from "antd";
import ButtonComponent from '../common/ButtonComponent';
import "./index.css";

interface ErrorComponentProps {
    message: string;
    onRetry?: () => void;
}

const ErrorComponent = ({
    message,
    onRetry,
}: ErrorComponentProps) => {
    return (
        <div
            className="error-message"
            role="alert"
            aria-live="assertive"
        >
            <Alert
                type="error"
                showIcon
                message="Something went wrong"
                description={message}
            />
            {onRetry && (
                <ButtonComponent
                    variant="default"
                    onClick={onRetry}
                >
                    Try again
                </ButtonComponent>
            )}
        </div>
    );
};

export default ErrorComponent;