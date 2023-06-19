import { UserModel } from "../../user/controllers/user.model";
import { RecurringExpensesModel } from "../models/recurring-expenses.model";

class RecurringExpensesSyncController {
  public static async sync(user) {
    const expenses = await RecurringExpensesModel.find({ userId: user._id });

    const monthlyExpenses = expenses.reduce((prev, curr) => {
      if (curr.frequency === "weekly" || curr.frequency === "monthly") {
        return prev + curr.amount;
      }

      return prev;
    }, 0);

    await UserModel.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          "data.recurringExpenses.monthly": monthlyExpenses,
        },
      }
    );
  }
}

export { RecurringExpensesSyncController };
