import { model, Schema, Types } from "mongoose";

const recurringExpensesHistorySchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  refId: {
    type: Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

const RecurringExpensesHistoryModel = model(
  "RecurringExpenses",
  recurringExpensesHistorySchema
);
export { RecurringExpensesHistoryModel };
