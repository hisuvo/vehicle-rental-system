"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesController = void 0;
const vehicles_service_1 = require("./vehicles.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.createVehicle(req.body);
        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const getVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.getVehicles();
        if (result.rows.length === 0) {
            return res.status(204).json({
                success: true,
                message: "No vehicles found",
                data: result.rows,
            });
        }
        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const getSingleVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const result = await vehicles_service_1.vehiclesService.getSingleVehicles(vehicleId);
        if (result.rows.length === 0) {
            return res.status(204).json({
                success: false,
                message: "No Content",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const updateVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.updateVehicles(req.body, req.params.vehicleId);
        return res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        await vehicles_service_1.vehiclesService.deletVehicles(vehicleId);
        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.vehiclesController = {
    createVehicle,
    getVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
