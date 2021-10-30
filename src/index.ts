import { NextFunction, Request, RequestHandler } from "express";
import { AnySchema, InferType, ValidationError } from "yup";

export type ValidatedRequest<T extends AnySchema> = Request & {
    data?: InferType<T> | Promise<InferType<T>>
}

export const useYup = <T extends AnySchema>(schema: T, selectorFn: (req: Request) => { [k: string]: any } = (req) => req.body): RequestHandler => {
    return (req: ValidatedRequest<T>, res, next: NextFunction) => {
        try {
            req.data = schema.validate(selectorFn(req), { abortEarly: false });
            next();
        } catch (e) {
            throw e;
        }
    }
}