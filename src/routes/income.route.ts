import express from "express";
import { IncomeController } from "../features/income/controllers/income.controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { IRoute } from "./expense.route";

const incomeRoute: IRoute[] = [
  {
    path: "/",
    method: "get",
    controller: IncomeController.getAllForUser,
    middlewares: [authMiddleware],
  },
  {
    path: "/",
    method: "post",
    controller: IncomeController.create,
    middlewares: [authMiddleware],
  },
  {
    path: "/:id",
    method: "put",
    controller: IncomeController.update,
    middlewares: [authMiddleware],
  },
];

export { incomeRoute };
