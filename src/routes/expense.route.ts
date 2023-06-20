import { IRoute } from "../core";
import { ExpenseController } from "../features/expenses/controllers/expenses.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const expenseRoute: IRoute[] = [
  {
    path: "/",
    method: "post",
    controller: ExpenseController.create,
    middlewares: [authMiddleware],
  },
  {
    path: "/breakdown",
    method: "get",
    controller: ExpenseController.getBreakdown,
    middlewares: [authMiddleware],
  },
];

export { expenseRoute };
