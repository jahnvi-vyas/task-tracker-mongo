import {
    NextFunction,
    Request,
    Response,
} from "express";
import { ZodType } from "zod";
import { AppError } from "../errors/AppError";

type ValidationSchemas = {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
};

export const validateRequest = (schemas: ValidationSchemas) => {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ): void => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params) as typeof req.params;
            }
            if (schemas.query) {
                schemas.query.parse(req.query);
            }
            next();
        } catch (error) {
            if (error instanceof Error) {
                throw new AppError("Request validation failed.", 400, error);
            }
            next(error);
        }
    };
};