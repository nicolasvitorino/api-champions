import express, { json, Request, Response } from "express";
import createApp from "./app";

const port = process.env.PORT || 3333;

const app = createApp();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
