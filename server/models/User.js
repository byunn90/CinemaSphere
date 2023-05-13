const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const movieSchema = require("./Movie");
const subscriptionSchema = require("./Subscription"); // Import the Subscription model

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription", // Use the actual Subscription model reference
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    savedMovies: [movieSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("movieCount").get(function () {
  return this.savedMovies.length;
});

userSchema.virtual("subscriptionDetails").get(function () {
  return this.subscription;
});

const User = model("User", userSchema);

module.exports = User;
