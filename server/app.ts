import express, { NextFunction, Request, Response } from "express"
export const app = express();


//import router
import userRouter from "./routes/userRoutes";
import courseRoute from "./routes/courseRoutes";
//Import libary
import cors from "cors"
import cookieParser from "cookie-parser";

//ErrorHandle
import { ErrorMiddleWare } from "./middleware/error";
import orderRoute from "./routes/orderRoute";
import notiRouter from "./routes/notificationRoutes";
import analytic from "./routes/analyticsRoute";
import layoutRoute from "./routes/layoutRoutes";

//body parser
app.use(express.json({ limit: "50mb" }));


//cookie parser
app.use(cookieParser())

//cors => cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//user api
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", notiRouter);
app.use("/api/v1", analytic);
app.use("/api/v1", layoutRoute);

//unknow route
app.all("*", (req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404
    next(err);
})


app.use(ErrorMiddleWare);