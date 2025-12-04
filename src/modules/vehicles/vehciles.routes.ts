import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";

const router = Router();

router.post("/", vehiclesController.createVehicle);
router.get("/", vehiclesController.getVehicle);
router.get("/:vehicleId", vehiclesController.getSingleVehicle);

export const vehiclesRouter = router;
