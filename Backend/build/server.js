"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./src/db/connection");
const PORT = process.env.PORT || 3001;
(0, connection_1.connectToDatabase)();
app_1.default.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
