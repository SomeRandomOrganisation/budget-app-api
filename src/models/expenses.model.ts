import { model, Schema, Types } from "mongoose";

const expenses = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "entertainment",
      "eating-out",
      "transport",
      "grocery",
      "cinema",
      "misc",
    ],
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

const ExpensesModel = model("Expenses", expenses);
export { ExpensesModel };
