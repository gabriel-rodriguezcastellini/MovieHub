import { NextFunction, Request, Response } from "express";
import firebaseApp from "../config/firebase";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next("Provide a token");
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      next("Invalid token format");
      return;
    }

    const token = authorization.split(" ")[1];
    await firebaseApp.auth().verifyIdToken(token);

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.errorInfo.code === "auth/argument-error") {
      next("Provide a token");
    }

    if (error.errorInfo.code === "auth/id-token-expired") {
      next("Token has expired");
    }

    next(error.message);
  }
};
