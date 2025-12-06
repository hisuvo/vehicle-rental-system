"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesService = void 0;
const db_1 = require("../../database/db");
const createVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    ]);
    return result;
};
const getVehicles = async () => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles`);
    return result;
};
const getSingleVehicles = async (vehicleId) => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
        vehicleId,
    ]);
    return result;
};
const updateVehicles = async (payload, vehicleId) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5  WHERE id=$6 RETURNING *`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        vehicleId,
    ]);
    return result;
};
const deletVehicles = async (vehicleId) => {
    const checkBooking = await db_1.pool.query(`SELECT availability_status FROM vehicles WHERE id=$1`, [vehicleId]);
    const { availability_status } = checkBooking.rows[0];
    if (availability_status === "booked") {
        throw new Error("Sorry, Your already booked!");
    }
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id=$1`, [
        vehicleId,
    ]);
    return result;
};
exports.vehiclesService = {
    createVehicle,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deletVehicles,
};
