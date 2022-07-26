"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_COMPANY_BY_ID = exports.CONTACT_CRM_PROFILE_PAGE_BY_ID = exports.CANDIDATE_PROFILE_PAGE_BY_ID = exports.GET_CRM_CPNTACTS_BY_PHONE_NUMBER = exports.GET_CRM_CONTACTS = exports.POST_ACTION = exports.GET_ALL_ACTIONS = exports.GET_CANDIDATES_BY_PHONE_NUMBER = exports.GET_CANDIDATES = void 0;
//==========================================
var BM_BASE_URL = "https://ui.boondmanager.com/api";
exports.GET_CANDIDATES = "".concat(BM_BASE_URL, "/candidates");
var GET_CANDIDATES_BY_PHONE_NUMBER = function (phoneNumber) {
    return "".concat(BM_BASE_URL, "/candidates?keywords=").concat(phoneNumber, "&keywordsType=phones");
};
exports.GET_CANDIDATES_BY_PHONE_NUMBER = GET_CANDIDATES_BY_PHONE_NUMBER;
exports.GET_ALL_ACTIONS = "".concat(BM_BASE_URL, "/actions");
exports.POST_ACTION = "".concat(BM_BASE_URL, "/actions");
exports.GET_CRM_CONTACTS = "".concat(BM_BASE_URL, "/contacts");
var GET_CRM_CPNTACTS_BY_PHONE_NUMBER = function (phoneNumber) {
    return "".concat(BM_BASE_URL, "/contacts?keywords=").concat(phoneNumber, "&keywordsType=phones");
};
exports.GET_CRM_CPNTACTS_BY_PHONE_NUMBER = GET_CRM_CPNTACTS_BY_PHONE_NUMBER;
var CANDIDATE_PROFILE_PAGE_BY_ID = function (candidate_id) {
    return "https://ui.boondmanager.com/candidates/".concat(candidate_id, "/information");
};
exports.CANDIDATE_PROFILE_PAGE_BY_ID = CANDIDATE_PROFILE_PAGE_BY_ID;
var CONTACT_CRM_PROFILE_PAGE_BY_ID = function (contactCrm_id) {
    return "https://ui.boondmanager.com/contacts/".concat(contactCrm_id, "/information");
};
exports.CONTACT_CRM_PROFILE_PAGE_BY_ID = CONTACT_CRM_PROFILE_PAGE_BY_ID;
var GET_COMPANY_BY_ID = function (id) {
    return "".concat(BM_BASE_URL, "/companies/").concat(id, "/information");
};
exports.GET_COMPANY_BY_ID = GET_COMPANY_BY_ID;
