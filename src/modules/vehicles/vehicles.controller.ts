import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicle(req.body);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehicles();

    if (result.rows.length === 0) {
      return res.status(204).json({
        success: true,
        message: "No vehicles found",
        data: result.rows,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    const result = await vehiclesService.getSingleVehicles(vehicleId);

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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.updateVehicles(
      req.body,
      req.params.vehicleId
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.vehicleId;
    const user = req.user;
    await vehiclesService.deletVehicles(user, vehicleId);

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesController = {
  createVehicle,
  getVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
