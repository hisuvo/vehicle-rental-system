import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

router.get("/", usersController.getUsers);
router.put("/:userId", usersController.updateUsers);
router.delete("/:userId", usersController.deleteUsers);

export const usersRouter = router;
