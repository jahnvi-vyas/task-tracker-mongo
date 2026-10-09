import { Select, type SelectProps } from "antd";
import './index.css'

interface SelectComponentProps extends SelectProps {
    label?: string;
}

const SelectComponent = ({
    label,
    className,
    popupClassName,
    ...props
}: SelectComponentProps) => {
    return (
        <div className="theme-select-wrapper">
            {label && (
                <label className="theme-select-label">
                    {label}
                </label>
            )}
            <Select
                {...props}
                className={`theme-select w-full ${className ?? ""}`}
                popupClassName={`theme-select-dropdown ${popupClassName ?? ""}`}
            />
        </div>
    );
};

export default SelectComponent;