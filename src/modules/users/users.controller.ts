import { Request, Response } from "express";
import { usersService } from "./users.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersService.getUsers();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = req.user;
    const result = await usersService.updateUsers(req.body, user, userId);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await usersService.deleteUsers(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const usersController = {
  getUsers,
  updateUsers,
  deleteUsers,
};
