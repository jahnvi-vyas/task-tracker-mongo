import { FilterOutlined } from "@ant-design/icons";
import type { TaskStatus } from "../../types/task";
import SelectComponent from '../common/SelectComponent';
import "./index.css";

export type FilterValue = | "ALL" | TaskStatus;

interface FilterComponentProps {
    value: FilterValue;
    onChange: (
        value: FilterValue
    ) => void;
    disabled?: boolean;
}

const FilterComponent = ({
    value,
    onChange,
    disabled = false,
}: FilterComponentProps) => {
    return (
        <div className="status-filter">
            <div className="status-filter__icon">
                <FilterOutlined />
            </div>
            <SelectComponent
                value={value}
                disabled={disabled}
                onChange={(nextValue) => onChange(nextValue as FilterValue)}
                options={[
                    {
                        value: "ALL",
                        label: "All statuses",
                    },
                    {
                        value: "TODO",
                        label: "To Do",
                    },
                    {
                        value: "IN_PROGRESS",
                        label: "In Progress",
                    },
                    {
                        value: "DONE",
                        label: "Done",
                    },
                ]}
            />
        </div>
    );
};

export default FilterComponent;