import "./index.css";

const HeaderComponent = () => {
    return (
        <header className="app-header">
            <div className="header-inner">
                <div className="brand">
                    <div className="brand-logo">
                        TT
                    </div>
                    <div className="brand-content">
                        <span className="brand-name">
                            Task Tracker
                        </span>
                        <span className="brand-subtitle">
                            Task Management
                        </span>
                    </div>
                </div>
                <div className="header-status">
                    <span className="status-dot" />
                    System Operational
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;