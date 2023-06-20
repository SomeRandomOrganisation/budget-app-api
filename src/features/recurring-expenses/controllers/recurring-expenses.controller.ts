import moment from "moment";
import { IncomeSyncController } from "../../income/controllers/income-sync.controller";
import { RecurringExpensesSyncController } from "./recurring-expenses-sync.controller";
import { IResponse } from "../../../core";
import { RecurringExpensesModel } from "../models/recurring-expenses.model";

class RecurringExpensesController {
  public static async getAllForUser(req): Promise<IResponse<any>> {
    const expenses = await RecurringExpensesModel.find({
      userId: req.auth.user._id,
    });

    return {
      statusCode: 200,
      data: expenses,
    };
  }

  public static async create(req): Promise<IResponse<any>> {
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

  public static async getBreakdown(req): Promise<IResponse<any>> {
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

  public static async getUpcoming(req): Promise<IResponse<any>> {
    const upcoming = await RecurringExpensesModel.find({
      userId: req.auth.user._id,
    });

    const mapped = upcoming
      .map((upcoming) => {
        let date;

        if (upcoming.frequency === "monthly") {
          date =
            upcoming.dayOfMonth === "end"
              ? moment().daysInMonth()
              : parseInt(upcoming.dayOfMonth);
        }

        return {
          title: upcoming.title,
          amount: upcoming.amount,
          category: upcoming.category,
          date,
        };
      })
      .filter((upcoming) => upcoming.date >= moment().date())
      .sort((a, b) => b.date - a.date);

    return {
      statusCode: 200,
      data: mapped,
    };
  }
}

export { RecurringExpensesController };
