"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActionService_1 = __importDefault(require("../services/ActionService"));
var CandidatesService_1 = __importDefault(require("../services/CandidatesService"));
var boondManagerConfig_1 = require("../lib/boondManagerConfig");
var CandidatesService_2 = __importDefault(require("../services/CandidatesService"));
var ContactCrmService_1 = __importDefault(require("../services/ContactCrmService"));
var boondManagerEndpoints_1 = require("../lib/boondManagerEndpoints");
var ActionController = /** @class */ (function () {
    function ActionController() {
        var _this = this;
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.addCallAction = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var actionService, candidateService, phoneNumber, text, apiResponse, candidates, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actionService = new ActionService_1.default();
                        candidateService = new CandidatesService_1.default();
                        phoneNumber = request.body.phoneNumber;
                        text = request.body.text;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, candidateService.getCandidatesByPhoneNumber(phoneNumber)];
                    case 2:
                        apiResponse = _a.sent();
                        if (!apiResponse) {
                            return [2 /*return*/, response.status(400).send({ message: "Error, could not get data from candidates by phone number" })];
                        }
                        // where no candidates with this phone number
                        if (apiResponse.data.length === 0) {
                            return [2 /*return*/, response.status(200).send({ messag: "No candidates with this phone number" })];
                        }
                        candidates = apiResponse.data;
                        return [4 /*yield*/, Promise.all(candidates.map(function (candidate) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, actionService.addCallActionToCandidate(candidate.id, boondManagerConfig_1.RESSOURCE_ID, text)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send({ message: "Action added successfully" })];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(400).send(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ActionController.prototype.getEvent = function (request, response) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var candidateService, actionService, contactCrmService, phoneNumberToProcess, event, agent, callDirection, missedCallReason, candidatesApiReponse, candidates, contactsCrmApiResponse, contactsCrm, callId, insightCardObject, isConstructedInsightCard, candidate, contactCrm, company, cardContent, payload, error_2, tag, comment, text, text, text, text, text, text, text, text, text, text, tag, comment, text, text, text, text, text, text;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        candidateService = new CandidatesService_2.default();
                        actionService = new ActionService_1.default();
                        contactCrmService = new ContactCrmService_1.default();
                        phoneNumberToProcess = request.body.data.raw_digits;
                        event = request.body.event;
                        agent = {
                            name: (_a = request.body.data.number) === null || _a === void 0 ? void 0 : _a.name,
                            digits: (_b = request.body.data.number) === null || _b === void 0 ? void 0 : _b.digits,
                        };
                        callDirection = request.body.data.direction;
                        missedCallReason = request.body.data.missed_call_reason;
                        return [4 /*yield*/, candidateService.getCandidatesByPhoneNumber(phoneNumberToProcess)];
                    case 1:
                        candidatesApiReponse = _c.sent();
                        candidates = candidatesApiReponse === null || candidatesApiReponse === void 0 ? void 0 : candidatesApiReponse.data;
                        return [4 /*yield*/, contactCrmService.getContactsCrmByPhoneNumber(phoneNumberToProcess)];
                    case 2:
                        contactsCrmApiResponse = _c.sent();
                        contactsCrm = contactsCrmApiResponse === null || contactsCrmApiResponse === void 0 ? void 0 : contactsCrmApiResponse.data;
                        if (!(event === "call.created")) return [3 /*break*/, 10];
                        callId = request.body.data.id;
                        insightCardObject = void 0;
                        isConstructedInsightCard = false;
                        if (candidates && candidates.length > 0) {
                            candidate = candidates[0];
                            insightCardObject = {
                                firstName: candidate.attributes.firstName,
                                lastName: candidate.attributes.lastName,
                                profileLink: (0, boondManagerEndpoints_1.CANDIDATE_PROFILE_PAGE_BY_ID)(candidate.id),
                                profileType: "candidate",
                            };
                            isConstructedInsightCard = true;
                        }
                        if (!(contactsCrm && contactsCrm.length > 0)) return [3 /*break*/, 4];
                        contactCrm = contactsCrm[0];
                        return [4 /*yield*/, contactCrmService.getContactsCrmCompanyName(contactCrm.relationships.company.data.id)];
                    case 3:
                        company = _c.sent();
                        //TODO : change IContactCRM type so we can get entreprise name
                        insightCardObject = {
                            firstName: contactCrm.attributes.firstName,
                            lastName: contactCrm.attributes.lastName,
                            profileLink: (0, boondManagerEndpoints_1.CANDIDATE_PROFILE_PAGE_BY_ID)(contactCrm.id),
                            profileType: "contactCrm",
                            entrepriseName: company === null || company === void 0 ? void 0 : company.data.attributes.name
                        };
                        isConstructedInsightCard = true;
                        _c.label = 4;
                    case 4:
                        if (!(isConstructedInsightCard === true)) return [3 /*break*/, 9];
                        cardContent = actionService.getInsightCardContent(insightCardObject.firstName, insightCardObject.lastName, insightCardObject.profileLink, insightCardObject.profileType, insightCardObject.entrepriseName);
                        payload = actionService.createInsightCardPayload(cardContent);
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, actionService.sendInsightCard(callId, payload)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, response.status(200).send({ message: "ok" })];
                    case 7:
                        error_2 = _c.sent();
                        console.log(error_2);
                        return [2 /*return*/, response.status(200).send({ message: "ok" })];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, response.status(200).send({ message: "ok" })];
                    case 10:
                        if (!(callDirection === "inbound")) return [3 /*break*/, 33];
                        tag = actionService.extractAgentTagName(request.body.data.tags);
                        comment = actionService.extractAgentComment(request.body.data.comments);
                        if (!(event === "call.tagged")) return [3 /*break*/, 14];
                        if (!candidates) return [3 /*break*/, 12];
                        text = actionService.callActionTextConstructor(agent.name, "# ".concat(tag), "inbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        if (!contactsCrm) return [3 /*break*/, 14];
                        text = actionService.callActionTextConstructor(agent.name, "# ".concat(tag), "inbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 13:
                        _c.sent();
                        _c.label = 14;
                    case 14:
                        if (!(event === "call.commented")) return [3 /*break*/, 18];
                        if (!candidates) return [3 /*break*/, 16];
                        text = actionService.callActionTextConstructor(agent.name, "".concat(comment), "inbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 15:
                        _c.sent();
                        _c.label = 16;
                    case 16:
                        if (!contactsCrm) return [3 /*break*/, 18];
                        text = actionService.callActionTextConstructor(agent.name, "".concat(comment), "inbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 17:
                        _c.sent();
                        _c.label = 18;
                    case 18:
                        if (!(event === "call.hungup")) return [3 /*break*/, 32];
                        if (!(missedCallReason === null)) return [3 /*break*/, 23];
                        if (!candidates) return [3 /*break*/, 20];
                        text = actionService.callActionTextConstructor(agent.name, "Candidat(e) a pu rejoindre ".concat(agent.name), "inbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 19:
                        _c.sent();
                        _c.label = 20;
                    case 20:
                        if (!contactsCrm) return [3 /*break*/, 22];
                        text = actionService.callActionTextConstructor(agent.name, "Le contact CRM a pu rejoindre ".concat(agent.name), "inbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 21:
                        _c.sent();
                        _c.label = 22;
                    case 22: return [3 /*break*/, 32];
                    case 23:
                        if (!(missedCallReason === "agents_did_not_answer")) return [3 /*break*/, 28];
                        if (!(candidates && candidates.length > 0)) return [3 /*break*/, 25];
                        text = actionService.callActionTextConstructor(agent.name, "Appel sans r\u00E9ponse", "inbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 24:
                        _c.sent();
                        _c.label = 25;
                    case 25:
                        if (!(contactsCrm && contactsCrm.length > 0)) return [3 /*break*/, 27];
                        text = actionService.callActionTextConstructor(agent.name, "Appel sans r\u00E9ponse", "inbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 26:
                        _c.sent();
                        _c.label = 27;
                    case 27: return [3 /*break*/, 32];
                    case 28:
                        if (!(candidates && candidates.length > 0)) return [3 /*break*/, 30];
                        text = actionService.callActionTextConstructor(agent.name, "Appel sans r\u00E9ponse", "inbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 29:
                        _c.sent();
                        _c.label = 30;
                    case 30:
                        if (!(contactsCrm && contactsCrm.length > 0)) return [3 /*break*/, 32];
                        text = actionService.callActionTextConstructor(agent.name, "Appel sans r\u00E9ponse", "inbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 31:
                        _c.sent();
                        _c.label = 32;
                    case 32: return [2 /*return*/, response.status(200).send({ message: "ok" })];
                    case 33:
                        if (!(callDirection === "outbound")) return [3 /*break*/, 46];
                        tag = actionService.extractAgentTagName(request.body.data.tags);
                        comment = actionService.extractAgentComment(request.body.data.comments);
                        if (!(event === "call.tagged")) return [3 /*break*/, 37];
                        if (!candidates) return [3 /*break*/, 35];
                        text = actionService.callActionTextConstructor(agent.name, "# ".concat(tag), "outbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 34:
                        _c.sent();
                        _c.label = 35;
                    case 35:
                        if (!contactsCrm) return [3 /*break*/, 37];
                        text = actionService.callActionTextConstructor(agent.name, "# ".concat(tag), "outbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 36:
                        _c.sent();
                        _c.label = 37;
                    case 37:
                        if (!(event === "call.commented")) return [3 /*break*/, 41];
                        if (!candidates) return [3 /*break*/, 39];
                        text = actionService.callActionTextConstructor(agent.name, "".concat(comment), "outbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 38:
                        _c.sent();
                        _c.label = 39;
                    case 39:
                        if (!contactsCrm) return [3 /*break*/, 41];
                        text = actionService.callActionTextConstructor(agent.name, "".concat(comment), "outbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 40:
                        _c.sent();
                        _c.label = 41;
                    case 41:
                        if (!(event === "call.hungup")) return [3 /*break*/, 45];
                        if (!candidates) return [3 /*break*/, 43];
                        text = actionService.callActionTextConstructor(agent.name, "", "outbound");
                        return [4 /*yield*/, actionService.addCallActionToCandidates(candidates, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 42:
                        _c.sent();
                        _c.label = 43;
                    case 43:
                        if (!contactsCrm) return [3 /*break*/, 45];
                        text = actionService.callActionTextConstructor(agent.name, "", "outbound");
                        return [4 /*yield*/, actionService.addCallActionToContactsCrm(contactsCrm, boondManagerConfig_1.RESSOURCE_ID, text)];
                    case 44:
                        _c.sent();
                        _c.label = 45;
                    case 45: return [2 /*return*/, response.status(200).send({ message: "ok" })];
                    case 46: return [2 /*return*/, response.status(200).send({ message: "ok" })];
                }
            });
        });
    };
    return ActionController;
}());
exports.default = ActionController;
