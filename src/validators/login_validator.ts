// api_server/validators/login_validator.ts
import Joi from "joi";

export const loginSchema = Joi.object({
  mobile_number: Joi.string().required(),
  dial_code: Joi.string().required(),
  otp: Joi.string(),
});
