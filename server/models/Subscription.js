const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["BASIC", "STANDARD", "PREMIUM"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELED"],
    required: true,
  },
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
