import { Schema, Types, model } from "mongoose";

const debtPaymentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    debtId: {
      type: Types.ObjectId,
      required: true,
    },
    amount: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const DebtPaymentModel = model("DebtPayment", debtPaymentSchema);
export { DebtPaymentModel };
