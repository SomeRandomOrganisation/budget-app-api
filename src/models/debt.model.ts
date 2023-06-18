import { model, Schema, Types } from "mongoose";

const debtSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

const DebtModel = model("Debt", debtSchema);
export { DebtModel };
