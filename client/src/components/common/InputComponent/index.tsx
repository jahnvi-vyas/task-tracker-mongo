import { Input, type InputProps } from "antd";
import "./index.css";

interface InputComponentProps extends InputProps {
    label?: string;
    error?: string;
}

const InputComponent = ({
    label,
    error,
    className,
    ...props
}: InputComponentProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            {label && (
                <label className="theme-input-label">
                    {label}
                </label>
            )}
            <Input
                {...props}
                status={error ? "error" : props.status}
                className={`theme-input ${className ?? ""}`}
            />
            {error && (
                <span className="theme-input-error">
                    {error}
                </span>
            )}
        </div>
    );
};

export default InputComponent;