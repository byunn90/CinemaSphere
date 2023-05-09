const { AuthenticationError } = require("apollo-server-express");
const { User, Subscription } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Get find Subscription
    subscriptionFind: async (_, args, context) => {
      if (context.subscription) {
        const subscription = await Subscription.findById(
          context.subscription._id
        ).populate();
        return subscription;
      }
    },

    me: async (_, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(
          "savedMovies"
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  //

  Mutation: {
    createSubscription: async (_, { userId, type, paymentStatus }) => {
      const subscription = await Subscription.create({
        userId,
        type,
        paymentStatus,
      });

      return subscription;
    },

    updateSubscription: async (_, { subscriptionId, type, paymentStatus }) => {
      const subscription = await Subscription.findByIdAndUpdate(
        subscriptionId,
        {
          type,
          paymentStatus,
        },
        { new: true }
      );

      return subscription;
    },

    deleteSubscription: async (_, { subscriptionId }) => {
      const subscription = await Subscription.findByIdAndDelete(subscriptionId);

      return subscription;
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      // check if user exists with email and credentials
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPassword = await user.isCorrectPassword(password);

      // check password
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  },
};
module.exports = resolvers;
