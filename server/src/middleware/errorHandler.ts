import {
    ErrorRequestHandler,
    Response,
} from "express";
import mongoose from "mongoose";
import { AppError } from "../errors/AppError";

const sendErrorResponse = (
    res: Response,
    statusCode: number,
    message: string,
    details?: unknown
): void => {
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(details !== undefined ? { details } : {}),
        },
    });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    console.error(error);
    if (error instanceof AppError) {
        sendErrorResponse(
            res,
            error.statusCode,
            error.message,
            error.details
        );
        return;
    }
    if (error instanceof mongoose.Error.ValidationError) {
        const details = Object.values(error.errors).map((validationError) => ({
            field: validationError.path,
            message: validationError.message,
        }));
        sendErrorResponse(res, 400, "Task validation failed.", details);
        return;
    }
    if (error instanceof mongoose.Error.CastError) {
        sendErrorResponse(res, 400, "Invalid task ID.");
        return;
    }
    sendErrorResponse(res, 500, "Internal server error.");
};