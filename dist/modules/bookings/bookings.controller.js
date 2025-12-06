"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const bookings_service_1 = require("./bookings.service");
const createBooking = async (req, res) => {
    try {
        const result = await bookings_service_1.bookingServices.createBooking(req.body);
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getBookings = async (req, res) => {
    try {
        const result = await bookings_service_1.bookingServices.getBookings();
        if (result.rows.length === 0) {
            return res.status(204).json({
                success: true,
                message: "No available vehicle",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message,
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const result = await bookings_service_1.bookingServices.updateBooking(req.body, bookingId);
        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
exports.bookingController = {
    createBooking,
    getBookings,
    updateBooking,
};
