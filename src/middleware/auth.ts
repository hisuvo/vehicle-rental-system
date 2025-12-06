import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/init";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return res.status(404).json({
          saccess: false,
          message: "Your Token Forbidden",
        });
      }

      const decoded = jwt.verify(token, config.private_key!) as JwtPayload;

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).json({
          saccess: false,
          message: "Your= are Unauthorized",
        });
      }

      next();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
        details: error,
      });
    }
  };
};

export default auth;
