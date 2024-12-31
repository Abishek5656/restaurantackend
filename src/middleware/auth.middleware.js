import { TryCatch } from "../middleware/error.js";
import jwt from "jsonwebtoken";
import { Admin } from "../model/admin.model.js";
import { ErrorHandler } from "../utils/utility.js";
import { JWT_KEY } from "../app.js";

export const verifyJWT = TryCatch(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ErrorHandler("Unauthorized request", 401));
  }

  try {
    const decodedToken = jwt.verify(token, JWT_KEY);

    const user = await Admin.findById(decodedToken?.userId).select("-password");

    if (!user) {
      return next(new ErrorHandler("Invalid Access Token", 401));
    }
    req.admin = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});
