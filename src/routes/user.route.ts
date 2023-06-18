import express from "express";

const userRoute = express.Router();

userRoute.get("/", (req, res) => {});

userRoute.post("/", (req, res) => {});

userRoute.post("/auth", (req, res) => {});

export { userRoute };
