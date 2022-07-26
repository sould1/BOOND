

export type EventType = "call.answered" | "call.hungup" | "call.voicemail_left" | "call.created" | "call.tagged" | "call.untagged" | "call.commented";


export type CallDirection = "inbound" | "outbound"
export interface ICallEvent {
    eventType: EventType
}

export interface ICallTag {
    id: number;
    name: string;
}

export interface ITag {
    id: number;
    name: string;
    color: string;
    description: string;
}

export interface ICallComment {
    content: string;
}

export interface ICall {
    call: {
        recording: string | null // it might be null incase there is no recoring
    }
}


export interface IInsightCardContentType {
    type: "shortText" | "title";
    text: string;
    label?: string;
    link?: string;
}


export type MissedCallReasonType = "out_of_opening_hours" | "short_abandoned" | "abandoned_in_ivr" | "abandoned_in_classic" | "no_available_agent" | "agents_did_not_answer" | null

export interface ICandidate {
    id: string,
    type: "candidate",
    attributes: {
        creationDate: string,
        updateDate: string,
        civility: number,
        firstName: string,
        lastName: string,
        title: string,
        email1: string
        phone1: string,
        country: string,
    },
    relationships: {
        mainManager: {
            data: {
                id: string,
                type: "resource"
            }
        },
        agency: {
            data: {
                id: string,
                type: "agency"
            }
        },
    }
}


export interface IResource {
    id: string,
    type: 'resource',
    attributes: {
        civility: number,
        firstName: string,
        lastName: string,
        creationDate: string,
        reference: string,
        typeOf: 0,
        state: 1,
        isVisible: true,
        thumbnail: string,
        skills: string,
        mobilityAreas: [],
        title: string,
        availability: string,
        averageDailyPriceExcludingTax: 0,
        email1: string,
        phone1: string,
        currency: 0,
        exchangeRate: 1,
        currencyAgency: 0,
        exchangeRateAgency: 1,
        numberOfResumes: 0,
        numberOfActivePositionings: 0
    },
    relationships: {
        mainManager: {
            data: {
                id: string,
                type: "resource"
            }
        },
        agency: {
            data: {
                id: string,
                type: "agency"
            }
        }
    }


}


export interface IContactCrm {
    id: string,
    type: "contact",
    attributes: {
        civility: 0,
        updateDate: string,
        creationDate: string,
        firstName: string,
        lastName: string,
        thumbnail: string
    },
    relationships: {
        mainManager: {
            data: {
                id: string,
                type: "resource"
            }
        },
        company: {
            data: {
                id: string,
                type: "company"
            }
        },
        agency: {
            data: {
                id: string,
                type: "agency"
            }
        }
    }
}

export interface ICompany {
    data: {
        id: string,
        type: string,
        attributes: {
            name: string
        }
    }
}


export interface ICandidatesResponse {
    data: ICandidate[]
}

export interface IContactsCrmResponse {
    data: IContactCrm[]
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





export type ActionTypeOf = 41 | 61 | 81;
export type CategoryType = "candidate" | "resource" | "contact"

export interface IAction {
    id: string;
    type?: "action";
    attributes: {
        startDate?: string,
        endDate?: string,
        startTimezone?: "Europe/Paris",
        endTimezone?: "Europe/Paris",
        typeOf: ActionTypeOf,
        text: string,
        location?: string,
        guests?: [],
        synchronizeWithAdvancedAppCalendar?: false
    },
    relationships: {
        dependsOn: {
            data: {
                type: CategoryType,
                id: string
            }
        },
        mainManager: {
            data: {
                type: "resource",
                id: string
            }
        }
    }
}


//only for post request
export interface IActionBoond {
    data: Omit<IAction, "id">
}


export interface IActionResponse {
    meta: any;
    data: IAction[];
    included: any[]
}


export interface IActionHolder {
    id: string;
    actionIds: string[]
}

export interface IUTCDateObject {
    hours: string;
    minutes: string;
    day: string;
    monthString: string;
    monthNumeric: string;
    year: string;
}

