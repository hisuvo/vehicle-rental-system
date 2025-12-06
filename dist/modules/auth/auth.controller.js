"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const signupUser = async (req, res) => {
    try {
        const result = await auth_service_1.authService.signupUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const signinUser = async (req, res) => {
    try {
        const result = await auth_service_1.authService.signinUser(req.body);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "you are unathorized",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
exports.authController = {
    signupUser,
    signinUser,
};
