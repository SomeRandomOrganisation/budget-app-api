import { ExpenseController } from "../features/expenses/controllers/expenses.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

export interface IResponse<T> {
  statusCode: number;
  data: T;
}

export interface IRoute {
  path: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  controller: (req: any) => Promise<IResponse<any>>;
  middlewares?: any[];
}

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
