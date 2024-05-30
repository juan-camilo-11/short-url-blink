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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./src/auth/auth-google");
const auth_1 = __importDefault(require("./src/routes/auth/auth"));
const user_1 = __importDefault(require("./src/routes/user/user"));
const connection_1 = require("./src/db/connection");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: `${process.env.APP_URL_FRONTEND}`,
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/', (req, res) => {
    res.send("Hola mundo");
});
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("Aquixd");
    res.status(401).json({ error: 'Unauthenticated user' });
}
app.use(auth_1.default);
app.use(isAuth);
app.use(user_1.default);
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.client.close();
    process.exit(0);
}));
exports.default = app;
