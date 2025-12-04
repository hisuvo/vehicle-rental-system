import express from "express";
import initDB from "./database/db";
import { authRouter } from "./modules/auth/auth.routes";
import { vehiclesRouter } from "./modules/vehicles/vehciles.routes";

const app = express();

// parse
app.use(express.json());

// DB
initDB();

app.get("/api/v1/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "This is vehicle rental system root api",
  });
});

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles", vehiclesRouter);

// 404 error
app.use((req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Server inernal error",
  });
  next();
});

export default app;
