import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import routes from "./routes";

import "../typeorm";

import "@shared/containers";
import AppError from "@shared/errors/AppError";

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      messsage: "Internal server error",
    });
  }
);

app.listen(3333, () => {
  console.log("🌋 Server started on port 3333!");
});
