"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./database/db"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const vehciles_routes_1 = require("./modules/vehicles/vehciles.routes");
const bookings_routes_1 = require("./modules/bookings/bookings.routes");
const users_routes_1 = require("./modules/users/users.routes");
const app = (0, express_1.default)();
// parse
app.use(express_1.default.json());
// DB
(0, db_1.default)();
app.get("/api/v1/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is vehicle rental system root api",
    });
});
// Routers
app.use("/api/v1/auth", auth_routes_1.authRouter);
app.use("/api/v1/vehicles", vehciles_routes_1.vehiclesRouter);
app.use("/api/v1/users", users_routes_1.usersRouter);
app.use("/api/v1/bookings", bookings_routes_1.bookingsRouter);
// 404 error
app.use((req, res, next) => {
    res.status(500).json({
        success: false,
        message: "Server inernal error",
    });
    next();
});
exports.default = app;
