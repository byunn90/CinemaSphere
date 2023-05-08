const { AuthenticationError } = require("apollo-server-express");
const { User, Movie, Subscription } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Get Subscription
    // getSubscription: async (_, { subscriptionId }) => {
    //   const subscription = await Subscription.findById(subscriptionId);
    //   if (!subscription) {
    //     throw new Error("Subscription not found");
    //   }
    //   return subscription;
    // },
    // // Get all subscriptions
    // getSubscriptions: async () => {
    //   const subscriptions = await Subscription.find();
    //   return subscriptions;
    // },
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
    // createSubscription: async (_, { userId, type }) => {
    //   const subscription = await Subscription.create({
    //     userId,
    //     type,
    //   });
    //   return subscription;
    // },
    // Update
    // Delete

    login: async (parent, { email, password }) => {
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
