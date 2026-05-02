import { Request, Response, NextFunction } from "express";
import { isActiveToken } from "./tokens";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ error: "Authorization token is missing" });
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token || !isActiveToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
