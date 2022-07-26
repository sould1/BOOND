
import { GET_CANDIDATES_BY_PHONE_NUMBER } from "../lib/boondManagerEndpoints"
import axios from "axios";
import { BM_TOKEN } from "../lib/boondManagerConfig";
import { ICandidatesResponse } from "../lib/types";

export default class CandidateService {
    //===========================================================
    public getCandidatesByPhoneNumber = async (phoneNumber: string): Promise<ICandidatesResponse | null> => {
        const { data } = await axios.get(GET_CANDIDATES_BY_PHONE_NUMBER(phoneNumber), { headers: { "Authorization": BM_TOKEN } });
        return data
    }
    //===========================================================
}