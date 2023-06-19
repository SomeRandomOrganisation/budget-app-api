import { model } from "mongoose";

const { Schema } = require("mongoose");

const userSchema = new Schema({
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
    avgExpense: {
      daily: {
        amount: {
          type: Number,
          default: 0,
        },
        breakdown: [
          {
            category: String,
            amount: Number,
          },
        ],
      },
      weekly: {
        amount: {
          type: Number,
          default: 0,
        },
        breakdown: [
          {
            category: String,
            amount: Number,
          },
        ],
      },
      monthly: {
        amount: {
          type: Number,
          default: 0,
        },
        breakdown: [
          {
            category: String,
            amount: Number,
          },
        ],
      },
      yearly: {
        amount: {
          type: Number,
          default: 0,
        },
        breakdown: [
          {
            category: String,
            amount: Number,
          },
        ],
      },
    },
  },
  createdAt: Date,
  updatedAt: Date,
});

const UserModel = model("User", userSchema);
export { UserModel };
