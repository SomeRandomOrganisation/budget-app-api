import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    signUpVia: {
      type: String,
      enum: ["direct", "google"],
      required: true,
    },
    settings: {
      currency: {
        type: String,
        enum: ["USD", "GBP"],
        required: true,
        default: "USD",
      },
    },
    data: {
      recurringExpenses: {
        monthly: {
          type: Number,
          default: 0,
        },
      },
      income: {
        monthly: {
          type: Number,
          default: 0,
        },
      },
      savings: {
        type: Number,
        default: 0,
      },
      investment: {
        type: Number,
        default: 0,
      },
      avgIncome: {
        monthly: {
          type: Number,
          default: 0,
        },
      },
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);
export { UserModel };
