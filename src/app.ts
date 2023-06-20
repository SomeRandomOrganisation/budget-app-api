import express, { Router } from "express";
import mongoose from "mongoose";
import {
  userRoute,
  recurringExpensesRoute,
  incomeRoute,
  expenseRoute,
} from "./routes";
import { authMiddleware } from "./middlewares/auth-middleware";
import { IRoute } from "./core";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const registerRoute = (base: string, children: IRoute[]) => {
  const router = Router();

  children.forEach((route) => {
    router[route.method](
      route.path,
      ...(route.middlewares || []),
      async (req, res) => {
        const response = await route.controller({
          ...req,
          auth: res.locals.auth,
        });

        res.status(response.statusCode).send(response.data);
      }
    );
  });

  app.use(base, router);
};

app.use("/user", userRoute);
registerRoute("/income", incomeRoute);
app.use("/recurring-expenses", authMiddleware, recurringExpensesRoute);
registerRoute("/expense", expenseRoute);

mongoose
  .connect(
    "mongodb://localhost:27017/budget-calculator?retryWrites=true&w=majority"
  )
  .then((value) => {
    console.log("DB connection successful");
  });

const port = 8080;
app.listen(port, async () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
