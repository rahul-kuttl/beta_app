// import { Request, Response, NextFunction } from "express";
// import Joi, { CustomHelpers } from "joi";
// import findCountryCode, { parsePhoneNumberFromString } from "libphonenumber-js";

// interface ValidationSchemaType {
//   dialCode: string;
//   mobileNumber: string;
//   otp?: string;
// }

// const mobileNumberSchema = Joi.object<ValidationSchemaType>({
//   dialCode: Joi.string().required(),
//   mobileNumber: Joi.string()
//     .required()
//     .custom((value, helpers: CustomHelpers) => {
//       try {
//         // Concatenate the dial code with the mobile number
//         const fullPhoneNumber = `${helpers.state.ancestors[0].dialCode}${value}`;
//         const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

//         if (!phoneNumber || !phoneNumber.isValid()) {
//           return helpers.error("any.invalid", {
//             value: "Invalid mobile number for the given dial code",
//           });
//         }
//       } catch (e) {
//         return helpers.error("any.invalid", {
//           value: "Invalid mobile number format",
//         });
//       }

//       return value; // Valid
//     }, "Mobile Number Validation"),
//   otp: Joi.string(),
// });

// // Example middleware for request validation
// export const validateLogin = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const schema = Joi.object({
//     mobileNumber: Joi.string().required(),
//     otp: Joi.string().required(),
//   });

//   const { error } = schema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   next();
// };

import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";

export const validate = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
    next();
  };
};
