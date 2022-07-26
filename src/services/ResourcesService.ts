import axios from "axios"
import { BM_TOKEN } from "../lib/boondManagerConfig"
import { GET_RESSOURCES_BY_PHONE_NUMBER } from "../lib/boondManagerEndpoints"



export default class ResourcesService {
    public getRessourceByPhoneNumber = async (phoneNumber: string): Promise<any> => {
        const { data } = await axios.get(GET_RESSOURCES_BY_PHONE_NUMBER(phoneNumber), { headers: { "Authorization": BM_TOKEN } });
        return data;
    }
}