"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CALL = exports.SEND_INSIGHT_CARD = exports.GET_USERS = exports.BASE_URL = void 0;
exports.BASE_URL = "https://api.aircall.io/v1";
exports.GET_USERS = "".concat(exports.BASE_URL, "/users/");
var SEND_INSIGHT_CARD = function (API_ID, API_TOKEN, callId) {
    var uri = "https://".concat(API_ID, ":").concat(API_TOKEN, "@api.aircall.io/v1/calls/").concat(callId, "/insight_cards");
    return uri;
};
exports.SEND_INSIGHT_CARD = SEND_INSIGHT_CARD;
var GET_CALL = function (call_id) {
    return "https://api.aircall.io/v1/calls/".concat(call_id);
};
exports.GET_CALL = GET_CALL;
