import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
}

const verifyJWTToken = (token: string, secret: string): Promise<JWTPayload> =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JWTPayload);
      }
    })
  );

export const requireAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const [bearer, token]: any = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Invalid authorization header format" });
  }

  try {
    const payload: any = await verifyJWTToken(
      token,
      process.env.JWT_SECRET as string
    );
    // Add the use: r ID to the request object for use in subsequent middleware or route handlers
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
