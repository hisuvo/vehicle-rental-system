"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const db_1 = require("../../database/db");
const getUsers = async () => {
    const result = await db_1.pool.query(`SELECT id, name, email, phone, role FROM users`);
    return result;
};
const updateUsers = async (payload, userId) => {
    const { name, email, phone } = payload;
    //todo: check role and give access update role key
    const result = await db_1.pool.query(`UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING name, email, phone, role`, [name, email, phone, userId]);
    return result;
};
const deleteUsers = async (userId) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
    return result;
};
exports.usersService = {
    getUsers,
    updateUsers,
    deleteUsers,
};
