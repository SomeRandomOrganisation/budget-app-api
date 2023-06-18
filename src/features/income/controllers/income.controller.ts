import { IncomeModel } from "../../../models";

class IncomeController {
  public static async getAllForUser(req: any) {
    const incomes = await IncomeModel.find({ userId: req.auth.userId });

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
    const userId = req.auth.userId;

    const income = await IncomeModel.create({ userId, ...req.body });

    return {
      statusCode: 201,
      data: income,
    };
  }
}

export { IncomeController };
