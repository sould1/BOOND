"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
        this.logErrors = function (error, request, resposne, next) {
            console.error(error.stack);
            next(error);
        };
        this.clientErrorHadnler = function (error, request, resposne, next) {
            if (request.xhr) {
                resposne.status(500).send({ error: 'Server error' });
            }
            else {
                next(error);
            }
        };
    }
    return ErrorHandler;
}());
exports.default = ErrorHandler;
