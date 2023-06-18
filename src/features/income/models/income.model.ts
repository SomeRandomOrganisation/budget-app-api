import { model, Schema, Types } from "mongoose";

const incomeSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "annually"],
    required: true,
  },
  dayOfMonth: {
    type: String,
    required: false,
    enum: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "end",
    ],
  },
  dayOfWeek: {
    type: String,
    enum: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
    required: false,
  },
  createdAt: Date,
  updatedAt: Date,
});

const IncomeModel = model("Income", incomeSchema);
export { IncomeModel };
