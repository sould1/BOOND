import ActionService from "../services/ActionService"
import { Response, Request } from "express";
import { BM_RESOURCE_ID } from "../lib/boondManagerConfig";
import CandidateService from "../services/CandidatesService";
import { CallDirection, CategoryType, EventType, IActionHolder } from "../lib/types";
import ContactCrmService from "../services/ContactCrmService";
import { CANDIDATE_PROFILE_PAGE_BY_ID, CONTACT_CRM_PROFILE_PAGE_BY_ID, RESOURCE_PROFILE_PAGE_BY_ID } from "../lib/boondManagerEndpoints";
import ResourcesService from "../services/ResourcesService";
import PhoneNumberTool from "../lib/PhoneNumberTool";

export default class ActionController {

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    public async getEvent(request: Request, response: Response): Promise<Response | null> {

        const candidateService = new CandidateService();
        const actionService = new ActionService();
        const contactCrmService = new ContactCrmService();
        const resourcesService = new ResourcesService();

        //variable from request.body of aircall
        // ===================================================
        const phoneNumberTool = new PhoneNumberTool();
        const numberRawDigits: string = request.body.data.raw_digits; //the candidate / contat phone number
        const phoneNumberToProcess: string = phoneNumberTool.getPhoneNumberVariant(numberRawDigits || ""); //the candidate / contat phone number
        const event: EventType = request.body.event;
        const agent = {
            name: request.body.data.number?.name as string,
            digits: request.body.data.number?.digits as string,
        }
        const callDirection: CallDirection = request.body.data.direction;
        const callTimeStamp = request.body.timestamp;

        const callDateIsoString = actionService.epochToIsoString(callTimeStamp);
        const formattedCallDate = actionService.epochToUtcDate(callTimeStamp);
        const callId = request.body.data.id;

        // ===================================================
        const candidatesApiReponse = await candidateService.getCandidatesByPhoneNumber(phoneNumberToProcess);
        const candidates = candidatesApiReponse?.data;
        // ===================================================
        const contactsCrmApiResponse = await contactCrmService.getContactsCrmByPhoneNumber(phoneNumberToProcess);
        const contactsCrm = contactsCrmApiResponse?.data;
        // ===================================================
        const resourcesApiResponse = await resourcesService.getRessourceByPhoneNumber(phoneNumberToProcess);
        const resources = resourcesApiResponse?.data;
        // ===================================================


        // will handle insight card
        if (event === "call.created") {
            let insightCardObject: {
                firstName: string,
                lastName: string,
                profileLink: string,
                profileType: CategoryType,
                entrepriseName?: string
            };

            let isConstructedInsightCard = false;
            if (candidates && candidates.length > 0 && isConstructedInsightCard === false) {
                const candidate = candidates[0];
                insightCardObject = {
                    firstName: candidate.attributes.firstName,
                    lastName: candidate.attributes.lastName,
                    profileLink: CANDIDATE_PROFILE_PAGE_BY_ID(candidate.id),
                    profileType: "candidate",
                }
                isConstructedInsightCard = true
            }

            if (resources && resources.length > 0 && isConstructedInsightCard === false) {
                const resource = resources[0];
                insightCardObject = {
                    firstName: resource.attributes.firstName,
                    lastName: resource.attributes.lastName,
                    profileLink: RESOURCE_PROFILE_PAGE_BY_ID(resource.id),
                    profileType: "resource",
                }
                isConstructedInsightCard = true
            }


            if (contactsCrm && contactsCrm.length > 0 && isConstructedInsightCard === false) {
                const contactCrm = contactsCrm[0];
                const company = await contactCrmService.getContactsCrmCompanyName(contactCrm.relationships.company.data.id);

                //TODO : change IContactCRM type so we can get entreprise name
                insightCardObject = {
                    firstName: contactCrm.attributes.firstName,
                    lastName: contactCrm.attributes.lastName,
                    profileLink: CONTACT_CRM_PROFILE_PAGE_BY_ID(contactCrm.id),
                    profileType: "contact",
                    entrepriseName: company?.data.attributes.name
                }
                isConstructedInsightCard = true
            }


            if (isConstructedInsightCard === false) {
                const lines = actionService.insightCardUnknownContentConstructor(callDirection);
                const payload = actionService.createInsightCardPayload(lines);
                try {
                    await actionService.sendInsightCard(callId, payload);
                    return response.sendStatus(200);
                }
                catch (error) {
                    console.log(error);
                    return response.sendStatus(200);
                }
            }


            // if candidate is found and insight card is consstructed then show it 
            if (isConstructedInsightCard === true) {
                const cardContent = actionService.getInsightCardContent(
                    callDirection,
                    insightCardObject!.firstName,
                    insightCardObject!.lastName,
                    insightCardObject!.profileLink,
                    insightCardObject!.profileType,
                    insightCardObject!.entrepriseName
                );

                const payload = actionService.createInsightCardPayload(cardContent);

                try {
                    await actionService.sendInsightCard(callId, payload);
                    return response.sendStatus(200);
                }
                catch (error) {
                    console.log(error);
                    return response.sendStatus(200);
                }
            }
            else {
                return response.sendStatus(200);
            }
        }

        // ===================================================
        if (callDirection === "inbound" || callDirection === "outbound") {

            const recording = actionService.getRecordingLink(request.body.data.id);
            try {
                if (event === "call.commented" || event === "call.tagged" || event === "call.untagged") {
                    const tagsIds = actionService.extractAgentTagsIds(request.body.data.tags);
                    const aircallTags = await actionService.getAircallTags();
                    if (!aircallTags) {
                        return response.sendStatus(200);
                    }

                    //TODO maybe better handling for null here
                    const usedTags = actionService.getUsedTags(tagsIds, aircallTags);
                    const comments = actionService.extractAgentComment(request.body.data.comments);

                    const text = actionService.callActionTextConstructor(agent.name, comments, usedTags, callDirection, recording, formattedCallDate, callId);
                    if (candidates && candidates.length > 0) {
                        const candidatesActions = await actionService.getCandidatesActions(candidates);
                        let actionsIds: IActionHolder[] = [];
                        if (actionsIds.length === 0) {
                            await actionService.addCallActionToCandidates(candidates, BM_RESOURCE_ID, text, callDateIsoString);
                        }
                        if (actionsIds.length > 0) {
                            await actionService.updateCallsActions(actionsIds, text, callDateIsoString, 41);
                        }
                        if (candidatesActions && candidatesActions.length > 0) {
                            actionsIds = actionService.getActionIdsByRef(candidatesActions, callId);
                        }
                        //===========================
                        const candidatesActions2 = await actionService.getCandidatesActions(candidates);
                        let actionsIds2: IActionHolder[] = [];
                        if (candidatesActions2) {
                            actionsIds2 = actionService.getActionIdsByRef(candidatesActions2, callId);
                            await actionService.deleteActions(actionsIds2);
                        }
                    }

                    if (resources && resources.length > 0) {
                        const resourcesActions = await actionService.getResourcesActions(resources);
                        let actionsIds: IActionHolder[] = [];
                        if (actionsIds.length === 0) {
                            await actionService.addCallActionToResources(resources, BM_RESOURCE_ID, text, callDateIsoString);
                        }
                        if (actionsIds.length > 0) {
                            await actionService.updateCallsActions(actionsIds, text, callDateIsoString, 81);
                        }
                        if (resourcesActions && resourcesActions.length > 0) {
                            actionsIds = actionService.getActionIdsByRef(resourcesActions, callId);
                        }
                        //================================
                        const resourcesActions2 = await actionService.getResourcesActions(resources);
                        let actionsIds2: IActionHolder[] = [];
                        if (resourcesActions2) {
                            actionsIds2 = actionService.getActionIdsByRef(resourcesActions2, callId);
                            await actionService.deleteActions(actionsIds2);
                        }
                    }
                    if (contactsCrm && contactsCrm.length > 0) {
                        const contactsActions = await actionService.getContactsActions(contactsCrm);
                        let actionsIds: IActionHolder[] = [];
                        if (actionsIds.length === 0) {
                            await actionService.addCallActionToContactsCrm(contactsCrm, BM_RESOURCE_ID, text, callDateIsoString);
                        }
                        if (actionsIds.length > 0) {
                            await actionService.updateCallsActions(actionsIds, text, callDateIsoString, 61);
                        }
                        if (contactsActions && contactsActions.length > 0) {
                            actionsIds = actionService.getActionIdsByRef(contactsActions, callId);
                        }

                        //================================
                        const contactsActions2 = await actionService.getContactsActions(contactsCrm);
                        let actionsIds2: IActionHolder[] = [];
                        if (contactsActions2) {
                            actionsIds2 = actionService.getActionIdsByRef(contactsActions2, callId);
                            await actionService.deleteActions(actionsIds2);
                        }
                    }
                }
            }
            catch (error: any) {
                console.log(error);
                return response.sendStatus(200);
            }
        }
        // ===================================================

        return response.sendStatus(200);
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
}
