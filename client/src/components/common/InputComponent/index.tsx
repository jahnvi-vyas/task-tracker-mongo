import { Input, type InputProps } from "antd";

interface InputComponentProps extends InputProps {
    label?: string;
    error?: string;
}

const InputComponent = ({
    label,
    error,
    ...props
}: InputComponentProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}
            <Input
                {...props}
                status={error ? "error" : props.status}
                className="!rounded-lg"
            />
            {error && (
                <span className="text-xs text-red-400">
                    {error}
                </span>
            )}
        </div>
    );
};

export default InputComponent;