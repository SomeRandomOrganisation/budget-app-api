import { IResponse } from "../../../core";
import { BudgetModel } from "../models/budget.model";

class BudgetController {
  public static async create(req): Promise<IResponse<any>> {
    const budget = await BudgetModel.create({
      userId: req.auth,
      ...req.body,
    });

    return {
      statusCode: 201,
      data: [],
    };
  }
}

export { BudgetController };
