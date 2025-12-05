import { pool } from "../../database/db";

const getUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result;
};

const updateUsers = async (payload: Record<string, unknown>, userId: any) => {
  const { name, email, phone } = payload;

  //todo: check role and give access update role key

  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING name, email, phone, role`,
    [name, email, phone, userId]
  );

  return result;
};

const deleteUsers = async (userId: any) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
  return result;
};

export const usersService = {
  getUsers,
  updateUsers,
  deleteUsers,
};
