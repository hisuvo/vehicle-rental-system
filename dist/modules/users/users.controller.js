"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const users_service_1 = require("./users.service");
const getUsers = async (req, res) => {
    try {
        const result = await users_service_1.usersService.getUsers();
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateUsers = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await users_service_1.usersService.updateUsers(req.body, userId);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteUsers = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await users_service_1.usersService.deleteUsers(userId);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.usersController = {
    getUsers,
    updateUsers,
    deleteUsers,
};
