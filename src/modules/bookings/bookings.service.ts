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
  if (user.role === "customer") {
    const result = await pool.query(
      `SELECT b.*, v.vehicle_name, v.registration_number
      FROM bookings b
      JOIN vehicles v ON v.id = b.vehicle_id
      WHERE b.customer_id = $1`,
      [user.id]
    );

    const rows = result.rows;
    const customerData = rows.map((row) => ({
      id: row.id,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
      },
    }));

    return customerData;
  }

  // ADMIN — show all bookings
  const result = await pool.query(
    `SELECT booking.*, u.name AS customer_name, u.email AS customer_email, v.vehicle_name, v.registration_number
     FROM bookings booking
     JOIN users u ON u.id = booking.customer_id
     JOIN vehicles v ON v.id = booking.vehicle_id`
  );

  const rows = result.rows;

  const adminData = rows.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    customer: {
      name: row.customer_name,
      email: row.customer_email,
    },
    vehicle: {
      vehicle_name: row.vehicle_name,
      registration_number: row.registration_number,
    },
  }));

  return adminData;
};

const updateBooking = async (
  payload: Record<string, unknown>,
  user: any,
  bookingID: any
) => {
  const { status } = payload;
  const { role } = user;

  const bookingInfo = await pool.query(
    `SELECT rent_start_date,vehicle_id, rent_end_date, status FROM bookings WHERE id=$1`,
    [bookingID]
  );

  if (
    new Date() > new Date(bookingInfo.rows[0].rent_end_date) &&
    bookingInfo.rows[0].status === "active"
  ) {
    await pool.query(`UPDATE booking SER status=$1 WHERE id=$1`, [
      "returned",
      bookingID,
    ]);

    await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
      "available",
      bookingInfo.rows[0].vehicle_id,
    ]);
  }

  if (bookingInfo.rows[0].status !== "active") {
    throw new Error(`Already ${bookingInfo.rows[0].status} booking at first`);
  }

  // user status is customer then he/she can only cancelled
  if (role === "customer") {
    if (new Date() > new Date(bookingInfo.rows[0].rent_start_date)) {
      throw new Error(`Already start booking data`);
    }

    if (status !== "cancelled") {
      throw new Error(`${role} can not ${status}`);
    }

    const result = await pool.query(
      `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
      [status, bookingID]
    );

    return result;
  }

  // user status is admin then he/she can only returned
  if (role === "admin") {
    if (status !== "returned") {
      throw new Error(`${role} can not ${status}`);
    }

    const result = await pool.query(
      `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
      [status, bookingID]
    );

    const { vehicle_id } = result.rows[0];

    const vehiclesUpdateStatus = await pool.query(
      `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING availability_status`,
      ["available", vehicle_id]
    );

    return { ...result.rows[0], vehicle: vehiclesUpdateStatus.rows[0] };
  }
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
