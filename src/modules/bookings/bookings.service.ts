import { pool } from "../../database/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // booking time validation
  const strat = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  let bookingTime = (Number(end) - Number(strat)) / (1000 * 60 * 60 * 24);
  if (bookingTime === 0) bookingTime = 1;

  if (bookingTime <= 0) {
    throw new Error("Rental end data must be big start date");
  }

  // Vehicles data gets so that can calucolte total price and availablity status
  const vehicleData = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);

  const { vehicle_name, daily_rent_price, availability_status } =
    vehicleData.rows[0];

  if (availability_status === "booked") {
    throw new Error("vehicle alredy Booked");
  }

  // update vehicles availablity status
  await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
    "booked",
    vehicle_id,
  ]);

  const total_price = daily_rent_price * bookingTime;
  const vehicle = { vehicle_name, daily_rent_price };

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5 ) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  return { ...result.rows[0], vehicle };
};

const getBookings = async (user: any) => {
  const { id, role } = user;

  // admin can show all bookings data
  if (role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
  }

  // customer show only her own booking data
  const result = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1`,
    [id]
  );
  return result;
};

const updateBooking = async (
  payload: Record<string, unknown>,
  bookingID: any
) => {
  const { status } = payload;
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingID]
  );

  return result;
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
