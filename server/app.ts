import express, { NextFunction, Request, Response } from "express"
export const app = express();

//Import libary
import cors from "cors"
import cookieParser from "cookie-parser";

//ErrorHandle
import { ErrorMiddleWare } from "./middleware/error";

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



//test api
app.get("/test", (req, res, next) => {
    res.status(200).json({
      success: true,
      messsage: "Hello",
    });
});


//unknow route
app.all("*", (req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404
    next(err);
})


app.use(ErrorMiddleWare);