"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var errorHandler_1 = __importDefault(require("./lib/errorHandler"));
var ActionController_1 = __importDefault(require("./controllers/ActionController"));
var CandidateController_1 = __importDefault(require("./controllers/CandidateController"));
var PingController_1 = __importDefault(require("./controllers/PingController"));
var app = (0, express_1.default)();
dotenv_1.default.config();
var port = process.env.PORT || 80;
//middleware
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var errorHadnler = new errorHandler_1.default;
app.set('view engine', 'ejs');
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(errorHadnler.logErrors);
app.use(errorHadnler.clientErrorHadnler);
app.use('/public', express_1.default.static('public'));
//ROUTES
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.get('/', function (request, response) {
    response.sendFile(__dirname + "/views/index.html");
});
//======================================================
var pingController = new PingController_1.default();
app.get("/ping", pingController.ping);
//======================================================
var actionController = new ActionController_1.default();
app.post("/actions", actionController.addCallAction);
app.post("/aircall/webhook", actionController.getEvent);
//======================================================
var candidatesController = new CandidateController_1.default();
app.get("/candidates", candidatesController.getCandidatesByPhoneNumber);
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.listen(port, function () {
    console.log("API is listening on port 80");
});
//======================================================
