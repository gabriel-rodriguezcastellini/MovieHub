import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export const usersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      req.body.userId = (
        await User.findOne({
          firebaseUid: JSON.parse(
            Buffer.from(
              authHeader.split(" ")[1].split(".")[1],
              "base64"
            ).toString()
          ).user_id,
        })
      )?.id;
    }

    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};
