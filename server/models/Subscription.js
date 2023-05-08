const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["basic", "standard", "premium"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    required: true,
  },
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
