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

const authMiddleware = async (req, res, next) => {
  const user = await UserModel.findById(
    new Types.ObjectId("648f4deded94bdb1780099a7")
  );

  res.locals.auth = {
    user,
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
