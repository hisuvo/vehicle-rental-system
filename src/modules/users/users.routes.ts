import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

router.get("/", usersController.getUsers);

export const usersRouter = router;
