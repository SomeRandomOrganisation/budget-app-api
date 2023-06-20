import { UserModel } from "../../user/models/user.model";
import { IncomeModel } from "../models/income.model";

class IncomeSyncController {
  public static async sync(user: any): Promise<void> {
    const incomes = await IncomeModel.find({ userId: user._id });

    const monthlyIncome = incomes.reduce((prev, curr) => {
      if (curr.frequency === "monthly" || curr.frequency === "weekly") {
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
          "data.income.monthly": monthlyIncome,
        },
      }
    );
  }
}

export { IncomeSyncController };
