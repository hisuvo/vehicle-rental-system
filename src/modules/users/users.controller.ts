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

export const usersController = {
  getUsers,
};
