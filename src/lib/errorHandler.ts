import { Request, Response, NextFunction } from "express";

export default class ErrorHandler {
    logErrors = (error: Error, request: Request, resposne: Response, next: NextFunction) => {
        console.error(error.stack);
        next(error);
    }

    clientErrorHadnler = (error: Error, request: Request, resposne: Response, next: NextFunction) => {
        if (request.xhr) {
            resposne.status(500).send({ error: 'Server error' });
        }
        else {
            next(error);
        }
    }
}