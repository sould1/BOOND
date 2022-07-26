

import { Response, Request } from "express";

export default class PingController {
    public ping = async (request: Request, response: Response): Promise<Response | null> => {
        const envTest = process.env.SERVER_STATUS_ENV;
        return response.status(200).send({ message: "pong", status: envTest || "pending" });
    }
}