"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), users_controller_1.usersController.getUsers);
router.put("/:userId", users_controller_1.usersController.updateUsers);
router.delete("/:userId", users_controller_1.usersController.deleteUsers);
exports.usersRouter = router;
