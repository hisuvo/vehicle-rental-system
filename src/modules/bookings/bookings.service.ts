import { pool } from "../../database/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleData = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);

  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = vehicleData.rows[0];

  if (availability_status === "booked") {
    throw new Error("vehicle alredy Booked");
  }

  // update vehicles availablity status
  await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
    "booked",
    vehicle_id,
  ]);

  const bookingDay = await pool.query(
    `SELECT $1::date - $2::date AS difference`,
    [rent_end_date, rent_start_date]
  );

  const total_price = daily_rent_price * bookingDay.rows[0].difference;
  const vehicle = { vehicle_name, daily_rent_price };

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5 ) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  return { ...result.rows[0], vehicle };
};

export const bookingServices = {
  createBooking,
};
