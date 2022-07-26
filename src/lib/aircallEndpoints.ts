export const BASE_URL = "https://api.aircall.io/v1";


export const GET_USERS = `${BASE_URL}/users/`

export const SEND_INSIGHT_CARD = (AIRCALL_API_ID: string, AIRCALL_API_TOKEN: string, callId: string): string => {
    const uri = `https://${AIRCALL_API_ID}:${AIRCALL_API_TOKEN}@api.aircall.io/v1/calls/${callId}/insight_cards`;
    return uri;
}


// TODO i should delete this
export const GET_CALL = (call_id: string) => {
    return `https://api.aircall.io/v1/calls/${call_id}`
}

export const GET_CALL_BY_ID = (call_id: string) => {
    return `https://assets.aircall.io/calls/${call_id}/recording`

}


export const GET_TAGS = `${BASE_URL}/tags`;