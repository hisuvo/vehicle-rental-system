import { Router } from "express";

const router = Router();

router.get("/", () => console.log("booking router"));

export const bookingsRouter = router;
