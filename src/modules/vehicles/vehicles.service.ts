import { pool } from "../../database/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicles = async (vehicleId: any) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);
  return result;
};

const updateVehicles = async (
  payload: Record<string, unknown>,
  vehicleId: any
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5  WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ]
  );
  return result;
};

const deletVehicles = async (vehicleId: any) => {
  const checkActiveBooking = await pool.query(
    `SELECT id FROM bookings WHERE id=$1 AND status='active'`,
    [vehicleId]
  );

  if (checkActiveBooking.rows.length > 0) {
    throw new Error("Sorry, active booking exist");
  }

  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  return result;
};

export const vehiclesService = {
  createVehicle,
  getVehicles,
  getSingleVehicles,
  updateVehicles,
  deletVehicles,
};
