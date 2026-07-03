import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface JwtPayload {
  userId: string;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(403).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized: Invalid Token" });
  }
}