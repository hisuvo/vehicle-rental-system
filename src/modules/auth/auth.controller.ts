import { Request, Response } from "express";
import { authService } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signupUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
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

const signinUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signinUser(req.body);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "you are unathorized",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const authController = {
  signupUser,
  signinUser,
};
