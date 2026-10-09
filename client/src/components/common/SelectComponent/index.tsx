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
        <div className="flex w-full flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-slate-200">
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