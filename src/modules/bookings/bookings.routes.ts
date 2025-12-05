import { Router } from "express";
import { bookingController } from "./bookings.controller";

const router = Router();

router.get("/", () => console.log("booking router"));
router.post("/", bookingController.createBooking);

export const bookingsRouter = router;
