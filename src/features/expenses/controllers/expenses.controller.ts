import { IResponse } from "../../../routes/expense.route";
import { ExpensesModel, IExpense } from "../models/expenses.model";

class ExpenseController {
  public static async create(req): Promise<IResponse<any>> {
    const user = req.auth.user;

    const expense = await ExpensesModel.create({
      userId: user._id,
      ...req.body,
    });

    return {
      statusCode: 201,
      data: expense,
    };
  }

  public static async getBreakdown(req): Promise<IResponse<any>> {
    const grouped = await ExpensesModel.aggregate([
      {
        $match: {
          userId: req.auth.user._id,
        },
      },
      {
        $group: {
          _id: "$category",
          amount: {
            $sum: "$amount",
          },
        },
      },
    ]).exec();

    return {
      statusCode: 201,
      data: grouped,
    };
  }
}

export { ExpenseController };
