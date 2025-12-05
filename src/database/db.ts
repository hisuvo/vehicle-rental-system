import { Pool } from "pg";
import config from "../config/init";

export const pool = new Pool({
  connectionString: config.connection_str,
});

const initDB = async () => {
  try {
    await pool.query(`
          CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL, 
          email VARCHAR(150) UNIQUE NOT NULL CHECK(email = LOWER(email)),
          password VARCHAR(200) NOT NULL CHECK(LENGTH(password) >= 6),
          phone VARCHAR(150) NOT NULL,
          role VARCHAR(10) DEFAULT 'customer' CHECK (role IN('admin','customer'))
          )
          `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(150) NOT NULL,
      type VARCHAR(100),
      registration_number VARCHAR(250) UNIQUE NOT NULL,
      daily_rent_price VARCHAR(100),
      availability_status VARCHAR(50) CHECK (availability_status IN ('available', 'booked'))
      )
      `);

    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
        CREATE TYPE booking_status AS ENUM ('active', 'cancelled', 'returned');
        END IF;
      END$$
      `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL ,
      total_price NUMERIC NOT NULL CHECK (total_price > 0),
      status booking_status NOT NULL DEFAULT 'active',
  
      CHECK(rent_end_date > rent_start_date)
      )
      `);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default initDB;

// CHECK(email = LOWER(email))
