import { RecurringExpensesModel } from "../../../models";
import { IncomeSyncController } from "../../income/controllers/income-sync.controller";
import { RecurringExpensesSyncController } from "./recurring-expenses-sync.controller";

class RecurringExpensesController {
  public static async getAllForUser(req) {
    const expenses = await RecurringExpensesModel.find({
      userId: req.auth.user._id,
    });

    return {
      statusCode: 200,
      data: expenses,
    };
  }

  public static async create(req) {
    const user = req.auth.user;

    const expense = await RecurringExpensesModel.create({
      userId: user._id,
      ...req.body,
    });

    await RecurringExpensesSyncController.sync(user);
    await IncomeSyncController.sync(user);

    return {
      statusCode: 201,
      data: expense,
    };
  }

  public static async getBreakdown(req) {
    const breakdown = await RecurringExpensesModel.aggregate([
      {
        $match: {
          userId: req.auth.user._id,
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
          },
          amount: {
            $sum: "$amount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          amount: "$amount",
        },
      },
    ])
      .sort({ amount: -1 })
      .exec();

    return {
      statusCode: 200,
      data: breakdown,
    };
  }
}

export { RecurringExpensesController };
