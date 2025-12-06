import { Router } from "express";
import { usersController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", auth("admin"), usersController.getUsers);
router.put("/:userId", auth("admin", "customer"), usersController.updateUsers);
router.delete("/:userId", usersController.deleteUsers);

export const usersRouter = router;
