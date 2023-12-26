import jwt from "jsonwebtoken";

export const generateToken = (user: { _id: string }) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || "kk", {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || "kk");
};
