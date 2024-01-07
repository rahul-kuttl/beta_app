import jwt from "jsonwebtoken";
export declare const generateToken: (user: {
    _id: string;
}) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt_util.d.ts.map