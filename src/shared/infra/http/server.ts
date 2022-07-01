import "reflect-metadata";

import express from "express";
import routes from "./routes";

import "../typeorm";

import "@shared/containers";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("🌋 Server started on port 3333!");
});
