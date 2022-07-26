




//==========================================
const BM_BASE_URL = "https://ui.boondmanager.com/api"


export const GET_CANDIDATES = `${BM_BASE_URL}/candidates`
export const GET_CANDIDATES_BY_PHONE_NUMBER = (phoneNumber: string): string => {
    return `${BM_BASE_URL}/candidates?keywords=${phoneNumber}&keywordsType=phones`
}

export const ALL_ACTIONS = `${BM_BASE_URL}/actions`
export const POST_ACTION = `${BM_BASE_URL}/actions`

export const ACTION_BY_ID = (action_id: string): string => {
    return `${BM_BASE_URL}/actions/${action_id}`;
}

export const GET_CRM_CONTACTS = `${BM_BASE_URL}/contacts`
export const GET_CRM_CPNTACTS_BY_PHONE_NUMBER = (phoneNumber: string): string => {
    return `${BM_BASE_URL}/contacts?keywords=${phoneNumber}&keywordsType=phones`;
}

//================================================
export const CANDIDATE_PROFILE_PAGE_BY_ID = (candidate_id: string): string => {
    return `https://ui.boondmanager.com/candidates/${candidate_id}/information`
}


export const CONTACT_CRM_PROFILE_PAGE_BY_ID = (contactCrm_id: string): string => {
    return `https://ui.boondmanager.com/contacts/${contactCrm_id}/information`
}

export const RESOURCE_PROFILE_PAGE_BY_ID = (resource_id: string): string => {
    return `https://ui.boondmanager.com/resources/${resource_id}/information`
}
//================================================


export const GET_COMPANY_BY_ID = (id: string): string => {
    return `${BM_BASE_URL}/companies/${id}/information`;
}

//================================================

export const GET_RESSOURCES_BY_PHONE_NUMBER = (phoneNumber: string): string => {
    return `${BM_BASE_URL}/resources?keywords=${phoneNumber}&keywordsType=phones`;
}
//================================================

export const CANDIDATE_ACTIONS = (candidate_id: string) => {
    return `${BM_BASE_URL}/candidates/${candidate_id}/actions`
}

export const RESOURCES_ACTIONS = (resource_id: string) => {
    return `${BM_BASE_URL}/resources/${resource_id}/actions`
}

export const CONTACT_CRM_ACTIONS = (contactCrm_id: string) => {
    return `${BM_BASE_URL}/contacts/${contactCrm_id}/actions`
}
//================================================