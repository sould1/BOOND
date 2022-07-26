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
var axios_1 = __importDefault(require("axios"));
var aircallConfig_1 = require("../lib/aircallConfig");
var aircallEndpoints_1 = require("../lib/aircallEndpoints");
var boondManagerConfig_1 = require("../lib/boondManagerConfig");
var boondManagerEndpoints_1 = require("../lib/boondManagerEndpoints");
var ActionService = /** @class */ (function () {
    function ActionService() {
        var _this = this;
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.callActionTextConstructor = function (agentName, notes, callDirection, recordingLink) {
            var recordingSection = "\n                <hr />                    \n                <div>\n                    <b style=\"color: blue;\">Enregistrement : </b> <a title=\"Lien de l'appel\" href=\"".concat(recordingLink, "\">Cliquer ici pour \u00E9couter</a>\n                </div>\n                ");
            var callDirectionSection = function () {
                if (callDirection === "inbound") {
                    return "Entrant";
                }
                else if (callDirection === "outbound") {
                    return "Sortant";
                }
            };
            var text = "\n                    <div>\n                        <b style=\"color: blue;\">Action Cr\u00E9ee par:</b> ".concat(agentName, "\n                    </div>\n                    <hr />\n                    <div>\n                        <b style=\"color: blue;\">Direction de l'appel :</b> ").concat(callDirectionSection(), "\n                    </div>\n                    <hr />\n                    <div>\n                        <b style=\"color: blue;\">Remarques :</b> ").concat(notes, "\n                    </div>\n                    ").concat(recordingLink === undefined ? "" : recordingSection, "\n            ");
            return text;
        };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.addCallActionToCandidate = function (candidate_Id, ressource_Id, text) { return __awaiter(_this, void 0, void 0, function () {
            var action, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = {
                            data: {
                                attributes: {
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
                        };
                        return [4 /*yield*/, axios_1.default.post(boondManagerEndpoints_1.POST_ACTION, action, { headers: { "Authorization": boondManagerConfig_1.BM_TOKEN } })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        }); };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.addCallActionToContactCrm = function (contactCrm_id, ressource_Id, text) { return __awaiter(_this, void 0, void 0, function () {
            var action, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = {
                            data: {
                                attributes: {
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
                        };
                        return [4 /*yield*/, axios_1.default.post(boondManagerEndpoints_1.POST_ACTION, action, { headers: { "Authorization": boondManagerConfig_1.BM_TOKEN } })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        }); };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.addCallActionToCandidates = function (candidates, ressource_Id, text) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(candidates.map(function (candidate) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.addCallActionToCandidate(candidate.id, ressource_Id, text)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.addCallActionToContactsCrm = function (contactsCrm, ressource_Id, text) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(contactsCrm.map(function (contactCrm) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.addCallActionToContactCrm(contactCrm.id, ressource_Id, text)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.insightCardCandidateContentConstructor = function (profileLink, firstName, lastName) {
            var lines = [
                {
                    "type": "title",
                    "text": "Appel",
                },
                {
                    "type": "shortText",
                    "text": "".concat(firstName, " ").concat(lastName.toUpperCase()),
                    "label": "QUI ? ",
                    "link": "".concat(profileLink)
                },
                {
                    "type": "shortText",
                    "text": "Candidat",
                    "label": "Type",
                }
            ];
            return lines;
        };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.insightCardContactCrmContentConstructor = function (profileLink, entrepriseName, firstName, lastName) {
            var lines = [
                {
                    "type": "title",
                    "text": "Appel",
                },
                {
                    "type": "shortText",
                    "text": "".concat(firstName, " ").concat(lastName.toUpperCase()),
                    "label": "QUI ? ",
                    "link": "".concat(profileLink)
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
                }
            ];
            return lines;
        };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.getInsightCardContent = function (firstName, lastName, profileLink, profileType, entrepriseName) {
            if (profileType === "candidate") {
                var lines = _this.insightCardCandidateContentConstructor(profileLink, firstName, lastName);
                return lines;
            }
            else if (profileType === "contactCrm" && entrepriseName) {
                var lines = _this.insightCardContactCrmContentConstructor(profileLink, entrepriseName, firstName, lastName);
                return lines;
            }
            else {
                var lines = [
                    {
                        "type": "title",
                        "text": "Appel",
                    },
                    {
                        "type": "shortText",
                        "text": "".concat(firstName, " ").concat(lastName.toUpperCase()),
                        "label": "QUI ? ",
                        "link": "".concat(profileLink)
                    },
                ];
                return lines;
            }
        };
        //create the 
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.createInsightCardPayload = function (lines) {
            return {
                contents: lines
            };
        };
        //send insight card to agent
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.sendInsightCard = function (callId, payload) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post((0, aircallEndpoints_1.SEND_INSIGHT_CARD)(aircallConfig_1.API_ID, aircallConfig_1.API_TOKEN, callId), payload)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        }); };
        // get added tag by user
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.extractAgentTagName = function (tags) {
            if (tags.length > 0) {
                return tags[tags.length - 1].name;
            }
            else {
                return null;
            }
        };
        // get added comment by user
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.extractAgentComment = function (comments) {
            if (comments.length > 0) {
                return comments[comments.length - 1].content;
            }
            else {
                return null;
            }
        };
        // get added comment by user
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.getCallByCallId = function (call_id) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get((0, aircallEndpoints_1.GET_CALL)(call_id), { headers: { "Authorization": aircallConfig_1.AIRCALL_AUTH_TOKEN } })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        }); };
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    }
    return ActionService;
}());
exports.default = ActionService;
