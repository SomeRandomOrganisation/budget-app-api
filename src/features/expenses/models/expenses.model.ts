import { model, Schema, Types } from "mongoose";

interface IExpense {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const expenses = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "food",
        "entertainment",
        "eating-out",
        "transport",
        "grocery",
        "cinema",
        "debt",
        "health",
        "skin-care",
        "supplement",
        "fine",
        "other",
      ],
      required: true,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const ExpensesModel = model("Expenses", expenses);
export { ExpensesModel, IExpense };
