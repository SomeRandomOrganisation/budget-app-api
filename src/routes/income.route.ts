import express from "express";
import { IncomeController } from "../features/income/controllers/income.controller";

const incomeRoute = express.Router();

const routes = [
  {
    path: "/",
    method: "get",
    controller: IncomeController.getAllForUser,
  },
  {
    path: "/",
    method: "post",
    controller: IncomeController.create,
  },
  {
    path: "/:id",
    method: "put",
    controller: IncomeController.update,
  },
];

routes.forEach((route) => {
  incomeRoute[route.method](route.path, async (req, res) => {
    const response = await route.controller({
      ...req,
      auth: res.locals.auth,
    });

    res.status(response.statusCode).send(response.data);
  });
});

export { incomeRoute };
