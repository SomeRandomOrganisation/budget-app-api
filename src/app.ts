import express from "express";
import mongoose, { Types } from "mongoose";
import { userRoute, recurringExpensesRoute, incomeRoute } from "./routes";
import {
  UserModel,
  DebtModel,
  ExpensesModel,
  IncomeModel,
  RecurringExpensesModel,
} from "./models";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = (req, res, next) => {
  res.locals.auth = {
    userId: new Types.ObjectId("648f2b04134647042e67e88c"),
  };

  next();
};

app.use("/user", userRoute);
app.use("/income", authMiddleware, incomeRoute);
app.use("/recurring-expenses", authMiddleware, recurringExpensesRoute);

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
