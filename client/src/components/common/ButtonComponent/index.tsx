import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./index.css";

interface ButtonComponentProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    children?: ReactNode;
    variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"
    | "text"
    | "default";
    size?:
    | "small"
    | "medium"
    | "large";
    type?:
    | "button"
    | "submit"
    | "reset";
    loading?: boolean;
    fullWidth?: boolean;
}

const ButtonComponent = ({
    children,
    variant = "default",
    size = "medium",
    type = "button",
    loading = false,
    disabled = false,
    fullWidth = false,
    className = "",
    ...props
}: ButtonComponentProps) => {
    return (
        <button
            type={type}
            className={[
                "app-button",
                `app-button--${variant}`,
                `app-button--${size}`,
                fullWidth ? "app-button--full-width" : "",
                className,
            ].filter(Boolean).join(" ")}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="app-button__loading">
                    <span className="app-button__spinner" />
                    <span>Loading...</span>
                </span>
            ) : (
                <span className="app-button__content">
                    {children}
                </span>
            )}
        </button>
    );
};

export default ButtonComponent;