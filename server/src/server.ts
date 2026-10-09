import "dotenv/config";
import app from "./app";
import {
    connectDatabase,
    disconnectDatabase,
} from "./config/database";

const PORT = Number(process.env.PORT) || 5000;
const startServer = async (): Promise<void> => {
    try {
        await connectDatabase();
        const server = app.listen(PORT, () => {
            console.log(`Task Tracker API running on http://localhost:${PORT}`);
        });
        const gracefulShutdown = async (signal: string): Promise<void> => {
            console.log(`${signal} received. Shutting down gracefully...`);
            server.close(
                async () => {
                    await disconnectDatabase();
                    process.exit(0);
                }
            );
        };
        process.on("SIGINT", () => {
            void gracefulShutdown("SIGINT");
        });
        process.on("SIGTERM", () => {
            void gracefulShutdown("SIGTERM");
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

void startServer();
