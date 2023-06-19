import express from "express";
import { RecurringExpensesController } from "../features/recurring-expenses/controllers/recurring-expenses.controller";
import { IRoute } from "./expense.route";

const recurringExpensesRoute = express.Router();

const routes: IRoute[] = [
  {
    path: "/",
    method: "get",
    controller: RecurringExpensesController.getAllForUser,
  },
  {
    path: "/",
    method: "post",
    controller: RecurringExpensesController.create,
  },
  {
    path: "/breakdown",
    method: "get",
    controller: RecurringExpensesController.getBreakdown,
  },
  {
    path: "/upcoming",
    method: "get",
    controller: RecurringExpensesController.getUpcoming,
  },
];

routes.forEach((route) => {
  recurringExpensesRoute[route.method](route.path, async (req, res) => {
    const response = await route.controller({
      ...req,
      auth: res.locals.auth,
    });

    res.status(response.statusCode).send(response.data);
  });
});

export { recurringExpensesRoute };
