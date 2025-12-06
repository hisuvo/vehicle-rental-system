"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const db_1 = require("../../database/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const init_1 = __importDefault(require("../../config/init"));
const signupUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    // hase password
    const hasePassword = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`, [name, email, hasePassword, phone, role]);
    return result;
};
const signinUser = async (payload) => {
    const { email, password } = payload;
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [
        email,
    ]);
    if (result.rowCount === 0) {
        return null;
    }
    const user = result.rows[0];
    const isMetch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMetch) {
        return false;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, init_1.default.private_key, { expiresIn: "10d" });
    delete user.password;
    return { token, user };
};
exports.authService = {
    signupUser,
    signinUser,
};
