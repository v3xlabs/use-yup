import { NextFunction, Request, RequestHandler } from "express";
import { AnySchema, InferType, ValidationError } from "yup";

export type UseYupRequest<T extends AnySchema> = UseYupObject<T, Request>;

export type UseYupObject<T extends AnySchema, R> = R & {
    yupData?: InferType<T>
}

export const useYup = <T extends AnySchema>(schema: T, selectorFn: (req: Request) => unknown = (req) => req.body): RequestHandler => {
    return (req: UseYupRequest<T>, res, next: NextFunction) => {
        schema.validate(selectorFn(req), { abortEarly: false }).then((data) => {
            req.yupData = data;
            next();
        }).catch((e: ValidationError) => {
            next(e);
        });
    }
}