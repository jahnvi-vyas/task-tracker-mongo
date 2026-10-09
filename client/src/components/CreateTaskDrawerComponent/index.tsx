import { Drawer } from "antd";
import TaskFormComponent from "../TaskFormComponent";
import type { CreateTaskPayload } from "../../types/task";
import './index.css';

interface CreateTaskDrawerComponentProps {
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onSubmit: (payload: CreateTaskPayload) => Promise<void>;
}

const CreateTaskDrawerComponent = ({
    open,
    loading,
    onClose,
    onSubmit,
}: CreateTaskDrawerComponentProps) => {
    return (
        <Drawer
            title="Create Task"
            placement="right"
            width={480}
            open={open}
            onClose={onClose}
            destroyOnClose
            maskClosable={!loading}
            closable={!loading}
            rootClassName="task-drawer"
        >
            <TaskFormComponent
                onSubmit={onSubmit}
                loading={loading}
            />
        </Drawer>
    );
};

export default CreateTaskDrawerComponent;