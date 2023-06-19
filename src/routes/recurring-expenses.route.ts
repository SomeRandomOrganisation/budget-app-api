import express from "express";
import { RecurringExpensesController } from "../features/recurring-expenses/controllers/recurring-expenses.controller";

const recurringExpensesRoute = express.Router();

const routes = [
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
