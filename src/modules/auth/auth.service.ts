import { pool } from "../../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/init";

const signupUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  // hase password
  const hasePassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,
    [name, email, hasePassword, phone, role]
  );
  return result;
};

const signinUser = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;

  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rowCount === 0) {
    return null;
  }

  const user = result.rows[0];

  const isMetch = await bcrypt.compare(password as string, user.password);

  if (!isMetch) {
    return false;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    config.private_key!,
    { expiresIn: "10d" }
  );

  delete user.password;

  return { token, user };
};

export const authService = {
  signupUser,
  signinUser,
};
