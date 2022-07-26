import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AIRCALL_AUTH_TOKEN, AIRCALL_API_ID, AIRCALL_API_TOKEN } from "../lib/aircallConfig";
import { GET_CALL, GET_CALL_BY_ID, GET_TAGS, SEND_INSIGHT_CARD } from "../lib/aircallEndpoints";
import { BM_TOKEN } from "../lib/boondManagerConfig";
import { ACTION_BY_ID, CANDIDATE_ACTIONS, CONTACT_CRM_ACTIONS, POST_ACTION, RESOURCES_ACTIONS } from "../lib/boondManagerEndpoints";
import { IActionBoond, ICandidate, IContactCrm, IInsightCardContentType, ICallTag, ICallComment, ICall, ITag, IActionResponse, IAction, IUTCDateObject, ActionTypeOf, IResource, CategoryType, CallDirection, IActionHolder } from "../lib/types";


export default class ActionService {


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    private insightCardCandidateContentConstructor = (callDirection: CallDirection, profileLink: string, firstName: string, lastName: string): IInsightCardContentType[] => {

        const lines: IInsightCardContentType[] = [
            {
                "type": "title",
                "text": `Appel ${callDirection === "inbound" ? "entrant" : "sortant"}`,
            },
            {
                "type": "shortText",
                "text": `${firstName} ${lastName.toUpperCase()}`,
                "label": `${callDirection === "inbound" ? "Appelant" : "Destinataire"}`,
            },
            {
                "type": "shortText",
                "text": "Candidat",
                "label": "Type",
            },
            {
                "type": "shortText",
                "text": `${firstName} ${lastName.toUpperCase()}`,
                "label": "Fiche BoondManager",
                "link": `${profileLink}`
            }
        ];
        return lines;
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    private insightCardResourceContentConstructor = (callDirection: CallDirection, profileLink: string, firstName: string, lastName: string): IInsightCardContentType[] => {

        const lines: IInsightCardContentType[] = [
            {
                "type": "title",
                "text": `Appel ${callDirection === "inbound" ? "entrant" : "sortant"}`,
            },
            {
                "type": "shortText",
                "text": `${firstName} ${lastName.toUpperCase()}`,
                "label": `${callDirection === "inbound" ? "Appelant" : "Destinataire"}`,
            },
            {
                "type": "shortText",
                "text": "Ressource",
                "label": "Type",
            },
            {
                "type": "shortText",
                "text": `${firstName} ${lastName.toUpperCase()}`,
                "label": "Fiche BoondManager",
                "link": `${profileLink}`
            }
        ];
        return lines;
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    private insightCardContactCrmContentConstructor = (callDirection: CallDirection, profileLink: string, entrepriseName: string, firstName: string, lastName: string): IInsightCardContentType[] => {
        const lines: IInsightCardContentType[] = [
            {
                "type": "title",
                "text": `Appel ${callDirection === "inbound" ? "entrant" : "sortant"}`,
            },
            {
                "type": "shortText",
                "text": `${firstName} ${lastName.toUpperCase()}`,
                "label": `${callDirection === "inbound" ? "Appelant" : "Destinataire"}`,
            },
            {
                "type": "shortText",
                "text": entrepriseName,
                "label": "Société",
            },
            {
                "type": "shortText",
                "text": "Contact CRM",
                "label": "Type",
            },
            {
                "type": "shortText",
                "text": `${firstName} ${lastName.toUpperCase()}`,
                "label": "Fiche BoondManager",
                "link": `${profileLink}`
            },
        ];
        return lines;
    }


    // insight card incase call is unknown
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public insightCardUnknownContentConstructor = (callDirection: CallDirection): IInsightCardContentType[] => {
        const lines: IInsightCardContentType[] = [
            {
                "type": "title",
                "text": `Appel ${callDirection === "inbound" ? "entrant" : "sortant"}`,
            },
            {
                "type": "shortText",
                "text": "N'est pas dans BoondManager",
                "label": `${callDirection === "inbound" ? "Appelant" : "Destinataire"}`,
            }
        ];
        return lines;
    }

    //convert epoch to javascript date object
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public epochToIsoString = (timestamp: number): string => {
        const d = new Date(0);
        d.setUTCSeconds(timestamp);
        return d.toISOString();
    }

    // Timestamp to date object
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public epochToUtcDate = (timestamp: number): IUTCDateObject => {
        const d = new Date(0);
        d.setUTCSeconds(timestamp);

        const capitalizeFirstLetter = (word: string): string => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }

        return {
            hours: format(d, 'HH'),
            minutes: format(d, 'mm'),
            day: format(d, 'dd'),
            monthString: capitalizeFirstLetter(format(d, 'MMMM', { locale: fr })),
            monthNumeric: format(d, 'MM'),
            year: format(d, 'yyyy'),
        }
    }


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    public callActionTextConstructor = (agentName: string, notes: string[], tags: ITag[] | null, callDirection: "inbound" | "outbound", recordingLink: string | null, date: IUTCDateObject, call_id: number) => {

        const callDirectionSection = () => {
            if (callDirection === "inbound") {
                return '<b style="color: #25af9f;">Entrant</b> réçu'
            }
            else if (callDirection === "outbound") {
                return '<b style="color: #25af9f; ">Sortant</b> effectué'
            }
        }
        //========================================

        const notesSection = () => {

            const notesList = () => {
                return notes.map((note) => {
                    return `<li>${note}</li>`
                })
            }

            if (notes && notes.length > 0) {
                return `
                <div style="margin-top : 10px;">
                    <b style="color: #25af9f;">Notes :</b>
                    <ul>
                        ${notesList()}
                    </ul>
                </div>
            `
            }
            else {
                return ''
            }
        }

        //========================================
        const recordingSection = () => {

            if (recordingLink !== null) {
                return `
                <div style="margin-top : 10px;">
                    <b style="color: #25af9f;">Enregistrement : </b> <a title="Lien de l'appel" rel="noopener noreferrer" target="_blank" href="${recordingLink}">Cliquer ici pour écouter</a>
                </div>
                `
            }
            else {
                return ''
            }
        }
        //========================================
        const tagsSection = () => {
            const tagsToShow: string[] = []
            if (tags && tags.length > 0) {
                tags.map((tag) => {
                    tagsToShow.push(
                        `<span style="color : #ffffff; background-color: ${tag.color}; display: inline-block; border-radius: 20%; padding: 4px">${tag.name}</span> &nbsp; &nbsp; `
                    )
                })
                return (`
                <div style="margin-top : 10px;">
                    ${tagsToShow.join('')}
                </div>
                `)
            }
            else {
                return ''
            }

        }

        const text = `
                    <div>
                        Appel ${callDirectionSection()} par <b style="color: #25af9f;">${agentName}</b> le <b style="color: #25af9f;">${date.day} ${date.monthString} ${date.year}</b> à <b style="color: #25af9f;">${date.hours}h${date.minutes}</b>&nbsp;&nbsp;<span style="font-size: 8pt;">(##REF${call_id}##)</span>
                    </div>
                    ${tagsSection()}
                    ${notesSection()}
                    ${recordingSection()}
            `
        return text;
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public addCallActionToCandidate = async (candidate_Id: string, ressource_Id: string, text: string, date: string): Promise<any> => {
        const action: IActionBoond = {
            data: {
                attributes: {
                    startDate: date,
                    endDate: date,
                    typeOf: 41,
                    text: text,
                },
                relationships: {
                    dependsOn: {
                        data: {
                            type: "candidate",
                            id: candidate_Id
                        }
                    },
                    mainManager: {
                        data: {
                            type: "resource",
                            id: ressource_Id
                        }
                    }
                }
            }
        }

        const { data } = await axios.post(POST_ACTION, action, { headers: { "Authorization": BM_TOKEN } })
        return data;
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public addCallActionToContactCrm = async (contactCrm_id: string, ressource_Id: string, text: string, date: string): Promise<any> => {
        const action: IActionBoond = {
            data: {
                attributes: {
                    startDate: date,
                    endDate: date,
                    typeOf: 61,
                    text: text,
                },
                relationships: {
                    dependsOn: {
                        data: {
                            type: "contact",
                            id: contactCrm_id
                        }
                    },
                    mainManager: {
                        data: {
                            type: "resource",
                            id: ressource_Id
                        }
                    }
                }
            }
        }

        const { data } = await axios.post(POST_ACTION, action, { headers: { "Authorization": BM_TOKEN } })
        return data;
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public addCallActionToResource = async (resource_id: string, ressource_Id: string, text: string, date: string): Promise<any> => {
        const action: IActionBoond = {
            data: {
                attributes: {
                    startDate: date,
                    endDate: date,
                    typeOf: 81,
                    text: text,
                },
                relationships: {
                    dependsOn: {
                        data: {
                            type: "resource",
                            id: resource_id
                        }
                    },
                    mainManager: {
                        data: {
                            type: "resource",
                            id: ressource_Id
                        }
                    }
                }
            }
        }


        const { data } = await axios.post(POST_ACTION, action, { headers: { "Authorization": BM_TOKEN } })
        return data;
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public addCallActionToCandidates = async (candidates: ICandidate[], ressource_Id: string, text: string, date: string): Promise<void> => {
        await Promise.all(candidates.map(async (candidate) => {
            await this.addCallActionToCandidate(
                candidate.id, ressource_Id, text, date);
        }))
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public addCallActionToContactsCrm = async (contactsCrm: IContactCrm[], ressource_Id: string, text: string, date: string): Promise<void> => {
        await Promise.all(contactsCrm.map(async (contactCrm) => {
            await this.addCallActionToContactCrm(
                contactCrm.id, ressource_Id, text, date);
        }))
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public addCallActionToResources = async (contactsCrm: IContactCrm[], ressource_Id: string, text: string, date: string): Promise<void> => {
        await Promise.all(contactsCrm.map(async (contactCrm) => {
            await this.addCallActionToResource(
                contactCrm.id, ressource_Id, text, date);
        }))
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getInsightCardContent = (
        callDirection: CallDirection,
        firstName: string,
        lastName: string,
        profileLink: string,
        profileType: CategoryType,
        entrepriseName?: string
    ): IInsightCardContentType[] => {
        if (profileType === "candidate") {
            const lines = this.insightCardCandidateContentConstructor(callDirection, profileLink, firstName, lastName);
            return lines
        }
        else if (profileType === "resource") {
            const lines = this.insightCardResourceContentConstructor(callDirection, profileLink, firstName, lastName);
            return lines
        }
        else if (profileType === "contact" && entrepriseName) {
            const lines = this.insightCardContactCrmContentConstructor(callDirection, profileLink, entrepriseName, firstName, lastName);
            return lines;
        }
        else {
            const lines: IInsightCardContentType[] = [
                {
                    "type": "title",
                    "text": "Appel",
                },
                {
                    "type": "shortText",
                    "text": `${firstName} ${lastName.toUpperCase()}`,
                    "label": "Appelant",
                    "link": `${profileLink}`
                },
            ]
            return lines
        }

    }

    //create the 
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public createInsightCardPayload = (lines: IInsightCardContentType[]) => {
        return {
            "contents": lines
        };
    };

    //send insight card to agent
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public sendInsightCard = async (callId: string, payload: { contents: IInsightCardContentType[] }) => {
        const { data } = await axios.post(SEND_INSIGHT_CARD(AIRCALL_API_ID, AIRCALL_API_TOKEN, callId), payload)
        return data;
    };

    // get added tag by user, sent in body request
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public extractAgentTagsIds = (tags: ICallTag[]): number[] => {
        if (tags.length > 0) {
            const tagsIds = []
            for (let i = 0; i < tags.length; i++) {
                tagsIds.push(tags[i].id);
            }
            return tagsIds;
        }
        else {
            return [];
        }
    }

    // get ALL tags from Aircall
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getAircallTags = async (): Promise<ITag[] | null> => {
        const { data } = await axios.get(GET_TAGS, { headers: { "Authorization": AIRCALL_AUTH_TOKEN } })
        return data.tags;
    }

    // get used tags
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getUsedTags = (tagsIds: number[], aircallTags: ITag[]): ITag[] => {
        const usedTags: ITag[] = [];
        for (let i = 0; i < tagsIds.length; i++) {
            aircallTags.filter((aircallTag) => {
                if (aircallTag.id === tagsIds[i]) {
                    usedTags.push(aircallTag);
                }
            })
        }
        return usedTags;
    }

    // get added comment by user
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public extractAgentComment = (comments: ICallComment[]): string[] => {
        const writtenComments: string[] = [];
        for (let i = 0; i < comments.length; i++) {
            writtenComments.push(comments[i].content);
        }
        return writtenComments
    }

    // get added comment by user
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getCallByCallId = async (call_id: string): Promise<ICall | null> => {
        const { data } = await axios.get(GET_CALL(call_id), { headers: { "Authorization": AIRCALL_AUTH_TOKEN } })
        return data;
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getRecordingLink = (call_id: string): string => {
        return GET_CALL_BY_ID(call_id);
    }

    //GET candidates actions
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getCandidateActions = async (candidate_id: string): Promise<IActionResponse | null> => {
        const { data } = await axios.get(CANDIDATE_ACTIONS(candidate_id), { headers: { "Authorization": BM_TOKEN } })
        return data;
    }


    public getCandidatesActions = async (candidates: ICandidate[]): Promise<IAction[] | null> => {
        const actions: IAction[] = [];
        await Promise.all(
            candidates.map(async (candidate) => {
                const candidateActions = await this.getCandidateActions(candidate.id);
                if (candidateActions) {
                    for (let i = 0; i < candidateActions.data.length; i++) {
                        actions.push(candidateActions.data[i]);
                    }
                }
            })
        )
        return actions;
    }


    //GET Resources actions
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getResourceActions = async (resource_id: string): Promise<IActionResponse | null> => {
        const { data } = await axios.get(RESOURCES_ACTIONS(resource_id), { headers: { "Authorization": BM_TOKEN } })
        return data;
    }

    public getResourcesActions = async (resources: IResource[]): Promise<IAction[] | null> => {
        const actions: IAction[] = [];
        await Promise.all(
            resources.map(async (resource) => {
                const resourceActions = await this.getResourceActions(resource.id);
                if (resourceActions) {
                    for (let i = 0; i < resourceActions.data.length; i++) {
                        actions.push(resourceActions.data[i]);
                    }
                }
            })
        )
        return actions;
    }

    //GET Contacts actions
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getContactActions = async (contact_id: string): Promise<IActionResponse | null> => {
        const { data } = await axios.get(CONTACT_CRM_ACTIONS(contact_id), { headers: { "Authorization": BM_TOKEN } })
        return data;
    }

    public getContactsActions = async (contacts: IContactCrm[]): Promise<IAction[] | null> => {
        const actions: IAction[] = [];
        await Promise.all(
            contacts.map(async (contact) => {
                const contactActions = await this.getContactActions(contact.id);
                if (contactActions) {
                    for (let i = 0; i < contactActions.data.length; i++) {
                        actions.push(contactActions.data[i]);
                    }
                }
            })
        )
        return actions;
    }

    // get all actions ids containing a reference sent in function arguments
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public getActionIdsByRef = (actions: IAction[], ref: string): IActionHolder[] => {

        const holdersActions: IActionHolder[] = []


        for (let i = 0; i < actions.length; i++) {
            if (actions[i].attributes.text.includes(`##REF${ref}##`) === true) {
                const index = holdersActions.findIndex(x => x.id === actions[i].relationships.dependsOn.data.id);
                if (index == -1) {
                    const arr: string[] = [];
                    arr.push(actions[i].id);
                    const initEntity: IActionHolder = {
                        id: actions[i].relationships.dependsOn.data.id,
                        actionIds: arr
                    }
                    holdersActions.push(initEntity);
                }
                else {
                    holdersActions[index].actionIds.push(actions[i].id);
                }
            }
        }


        return holdersActions;
    }

    //update text attribute of action having the id without creating a new action or deleteing action id
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public updateCallAction = async (action_id: string, text: string, date: string, actionType: ActionTypeOf): Promise<IAction | null> => {
        const action: { data: Omit<IAction, "relationships"> } = {
            data: {
                id: action_id,
                attributes: {
                    startDate: date,
                    endDate: date,
                    typeOf: actionType,
                    text: text,
                }
            }
        }
        const { data } = await axios.put(ACTION_BY_ID(action_id), action, { headers: { "Authorization": BM_TOKEN } })
        return data;
    }


    public updateCallsActions = async (actionsHolders: IActionHolder[], text: string, date: string, actionType: ActionTypeOf): Promise<void> => {
        for (let i = 0; i < actionsHolders.length; i++) {
            const actionsIds = actionsHolders[i].actionIds;
            for (let j = 0; j < actionsIds.length; j++) {
                await this.updateCallAction(actionsIds[j], text, date, actionType);

            }
        }
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    public deleteAction = async (action_id: string): Promise<void> => {
        try {
            await axios.delete(ACTION_BY_ID(action_id), { headers: { "Authorization": BM_TOKEN } })
        }
        catch (error: any) {
            console.log(error.message)
        }
    }


    public deleteActions = async (actionsHolders: IActionHolder[]): Promise<void> => {

        for (let i = 0; i < actionsHolders.length; i++) {
            await Promise.all(
                actionsHolders[i].actionIds.slice(1).map(async (actionId) => {
                    await this.deleteAction(actionId);
                })
            )
        }
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

}