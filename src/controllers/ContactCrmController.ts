import { Request, Response } from "express";
import ContactCrmService from "../services/ContactCrmService";

export default class CandidateController {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getCandidatesByPhoneNumber = async (request: Request, response: Response): Promise<Response | null> => {
        const contactCrmService = new ContactCrmService();
        try {
            const contactsCrm = await contactCrmService.getContactsCrmByPhoneNumber(request.body.phoneNumber);
            return response.status(200).send(contactsCrm);
        }
        catch (error) {
            return response.status(400).send(error);
        }
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

}