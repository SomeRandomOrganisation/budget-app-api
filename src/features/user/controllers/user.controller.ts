import { UserModel } from "./user.model";

class UserController {
  public static async create(req) {
    const user = await UserModel.create({ ...req.body, signUpVia: "direct" });

    return {
      statusCode: 201,
      data: user,
    };
  }
}

export { UserController };
