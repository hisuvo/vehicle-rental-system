import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await bookingServices.getBookings(user);

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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const result = await bookingServices.updateBooking(req.body, bookingId);

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};
