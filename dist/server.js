"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const init_1 = __importDefault(require("./config/init"));
app_1.default.listen(init_1.default.port, () => {
    console.log(`Server port run on ${init_1.default.port}`);
});
