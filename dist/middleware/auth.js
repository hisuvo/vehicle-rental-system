"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const init_1 = __importDefault(require("../config/init"));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(" ")[1];
            if (!token) {
                throw new Error("Your are not allowed");
            }
            const decoded = jsonwebtoken_1.default.verify(token, init_1.default.private_key);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                throw new Error("Your are unauthorize");
            }
            next();
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};
exports.default = auth;
