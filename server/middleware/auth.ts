import { Response, Request, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandle from "../utils/ErrorHandle";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { redis } from "../utils/redis";


export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      return next(new ErrorHandle("Please login to access !!", 404));
    }
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandle("access token is invalid", 404));
    }
    const userDecode = await redis.get(decoded.id);
    if (!userDecode) {
      return next(new ErrorHandle("User not found", 404));
    }
    (req as any).user = JSON.parse(userDecode);
    next();
  }
);


//validate user role
export const authorizeRoles = (...roles:string[])=>{
  return (req:Request,res:Response,next:NextFunction)=>{
    if (!roles.includes((req as any).user.role || "")) {
      return next(
        new ErrorHandle(
          `Role ${(req as any).user.role} is not allow access this resource`,
          404
        )
      );
    }
    next();
  }
}
