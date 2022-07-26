


import { GET_COMPANY_BY_ID, GET_CRM_CPNTACTS_BY_PHONE_NUMBER } from "../lib/boondManagerEndpoints"
import axios from "axios";
import { BM_TOKEN } from "../lib/boondManagerConfig";
import { ICompany, IContactsCrmResponse } from "../lib/types";

export default class ContactCrmService {
    //===========================================================
    public getContactsCrmByPhoneNumber = async (phoneNumber: string): Promise<IContactsCrmResponse | null> => {
        const { data } = await axios.get(GET_CRM_CPNTACTS_BY_PHONE_NUMBER(phoneNumber), { headers: { "Authorization": BM_TOKEN } });
        return data
    }
    //===========================================================

    public getContactsCrmCompanyName = async (companyId: string): Promise<ICompany | null> => {
        const { data } = await axios.get(GET_COMPANY_BY_ID(companyId), { headers: { "Authorization": BM_TOKEN } });
        return data
    }
}