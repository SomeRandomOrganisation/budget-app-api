import { Types } from "mongoose";
import { RecurringExpensesModel } from "../models/recurring-expenses.model";
import { IResponse } from "../../../core";

class UpdateRecurringExpensesController {
  public static async update(req): Promise<IResponse<any>> {
    const expense = await RecurringExpensesModel.findOne({
      userId: req.auth.user._id,
      _id: new Types.ObjectId(req.param.id),
    });

    if (expense.frequency === "monthly") {
    }

    const modified = await expense.updateOne({ ...req.body });

    return {
      statusCode: 200,
      data: modified,
    };
  }
}

export { UpdateRecurringExpensesController };
