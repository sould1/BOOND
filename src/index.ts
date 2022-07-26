import express, { response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ErrorHandler from "./lib/errorHandler";
import ActionController from "./controllers/ActionController";
import CandidateController from "./controllers/CandidateController";
import PingController from "./controllers/PingController";



const app = express();
dotenv.config();
console.log(process.env.BM_TOKEN);
console.log(process.env.BM_RESOURCE_ID);
console.log(process.env.AIRCALL_API_ID);
console.log(process.env.AIRCALL_API_TOKEN);
console.log(process.env.AIRCALL_AUTH_TOKEN);


const port = process.env.PORT || 80

//middleware
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const errorHadnler = new ErrorHandler
app.set('view engine', 'ejs');

app.use(cors({
    origin: "*"
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHadnler.logErrors);
app.use(errorHadnler.clientErrorHadnler);
app.use('/public', express.static('public'))

//ROUTES
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.get('/', function (request, response) {
    response.sendFile(__dirname + "/views/index.html")
});
//======================================================
const pingController = new PingController();
app.get("/ping", pingController.ping);
//======================================================
const actionController = new ActionController();
app.post("/aircall/webhook", actionController.getEvent);
//======================================================
const candidatesController = new CandidateController();
app.get("/candidates", candidatesController.getCandidatesByPhoneNumber)
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.listen(port, () => {
    console.log("API is listening on port 80");
})
//======================================================











