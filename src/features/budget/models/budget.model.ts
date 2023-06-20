import { Schema, Types, model } from "mongoose";

const budgetSchema = new Schema({
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
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  category: {
    type: String,
    enum: [
      "entertainment",
      "eating-out",
      "food",
      "transport",
      "grocery",
      "cinema",
      "debt",
      "health",
      "skin-care",
      "supplement",
      "other",
    ],
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

const BudgetModel = model("Budget", budgetSchema);
export { BudgetModel };
