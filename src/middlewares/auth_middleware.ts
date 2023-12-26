import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user_model";

export const authenticate = async (
  req: Request & { user: unknown },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access Denied: No token provided.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "hh") as {
      id: string;
    };
    const user = await UserModel.findOne({ _id: decoded?.id }).lean();
    if (!user) {
      return res.status(400).send("Invalid token.");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
