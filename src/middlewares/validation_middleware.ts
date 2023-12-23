import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Example middleware for request validation
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    mobileNumber: Joi.string().required(),
    otp: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
