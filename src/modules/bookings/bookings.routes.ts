import { Router } from "express";
import { bookingController } from "./bookings.controller";

const router = Router();

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.put("/:bookingId", bookingController.updateBooking);

export const bookingsRouter = router;
