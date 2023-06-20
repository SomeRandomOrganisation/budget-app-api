import { IResponse } from "../../../core";
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
      {
        $project: {
          _id: 0,
          category: "$_id",
          amount: "$amount",
        },
      },
    ])
      .sort({ amount: -1 })
      .exec();

    return {
      statusCode: 200,
      data: grouped,
    };
  }
}

export { ExpenseController };
