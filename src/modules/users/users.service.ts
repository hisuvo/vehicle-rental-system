import { pool } from "../../database/db";

const getUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result;
};

const updateUsers = async (
  payload: Record<string, unknown>,
  user: any,
  userId: any
) => {
  const { name, email, phone, role } = payload;

  if (user.role === "admin") {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING name, email, phone, role`,
      [name, email, phone, role, userId]
    );

    return result;
  }

  // coustomer cann't chage her role
  if (role) {
    throw new Error("Admin only can change role");
  }

  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING name, email, phone, role`,
    [name, email, phone, userId]
  );

  return result;
};

const deleteUsers = async (userId: any) => {
  const bookings = await pool.query(
    `SELECT status FROM bookings WHERE customer_id=$1`,
    [userId]
  );

  const hasActiveBookig = bookings.rows.some(
    (boking) => boking.status === "active"
  );

  if (hasActiveBookig) {
    throw new Error("User active bookings exist");
  }

  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
  return result;
};

export const usersService = {
  getUsers,
  updateUsers,
  deleteUsers,
};
