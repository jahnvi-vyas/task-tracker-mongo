import express from "express";
import cors from "cors";
import helmet from "helmet";
import taskRoutes from "./routes/taskRoutes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

app.use(helmet());
app.use(cors({
    origin: clientUrl,
    methods: [
        "GET",
        "POST",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],
}));

app.use(express.json({
    limit: "1mb",
}));

app.use(express.urlencoded({
    extended: true,
    limit: "1mb",
}));

app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        data: {
            status: "ok",
            service: "taskflow-api",
            timestamp: new Date().toISOString(),
        },
    });
});

app.use("/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;