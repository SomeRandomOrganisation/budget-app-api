import { IncomeModel } from "../../../models";
import { IncomeSyncController } from "./income-sync.controller";

class IncomeController {
  public static async getAllForUser(req: any) {
    const incomes = await IncomeModel.find({ userId: req.auth.user._id });

    return {
      statusCode: 200,
      data: incomes,
    };
  }

  public static async update(req: any) {
    return {
      statusCode: 200,
      data: {},
    };
  }

  public static async create(req: any) {
    const userId = req.auth.user._id;

    const income = await IncomeModel.create({ userId, ...req.body });

    await IncomeSyncController.sync(req.auth.user);

    return {
      statusCode: 201,
      data: income,
    };
  }
}

export { IncomeController };
