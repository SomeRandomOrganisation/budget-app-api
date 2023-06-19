import { Types } from "mongoose";
import { UserModel } from "../models";

export const authMiddleware = async (req, res, next) => {
  const user = await UserModel.findById(
    new Types.ObjectId("648f4deded94bdb1780099a7")
  );

  res.locals.auth = {
    user,
  };

  next();
};
