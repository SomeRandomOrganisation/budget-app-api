import { IResponse } from "../../../core";
import { DebtModel } from "../models/debt.model";

class DebtController {
  public static async create(req: any): Promise<IResponse<any>> {
    const debt = await DebtModel.create({
      user: req.auth.user._id,
      ...req.body,
    });

    return {
      statusCode: 201,
      data: debt,
    };
  }
}

export { DebtController };
