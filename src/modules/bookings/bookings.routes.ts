import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", bookingController.createBooking);
router.get("/", auth("admin", "customer"), bookingController.getBookings);
router.put("/:bookingId", bookingController.updateBooking);

export const bookingsRouter = router;
