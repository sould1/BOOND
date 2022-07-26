import { Request, Response } from "express";
import CandidateService from "../services/CandidatesService";

export default class CandidateController {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getCandidatesByPhoneNumber = async (request: Request, response: Response): Promise<Response | null> => {
        const candidatesService = new CandidateService();
        try {
            const candidates = await candidatesService.getCandidatesByPhoneNumber(request.body.phoneNumber);
            return response.status(200).send(candidates);
        }
        catch (error) {
            return response.status(400).send(error);
        }
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

}