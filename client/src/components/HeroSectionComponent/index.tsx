import { PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../common/ButtonComponent";
import "./index.css";

interface HeroSectionProps {
    onCreateTask: () => void;
}

const HeroSection = ({ onCreateTask }: HeroSectionProps) => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="hero-eyebrow">
                    Workspace
                </div>
                <h1 className="hero-title">
                    Manage your tasks efficiently.
                </h1>
                <p className="hero-description">
                    Create, organize and track your
                    team's work from one place.
                </p>
            </div>
            <ButtonComponent
                variant="primary"
                size="medium"
                onClick={onCreateTask}
            >
                <PlusOutlined />
                Create Task
            </ButtonComponent>
        </section>
    );
};

export default HeroSection;