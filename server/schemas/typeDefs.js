const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovies: [Movies]
    subscription: Subscription
  }

  type Movies {
    movieId: ID
    description: String
    director: [String]
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input MovieInput {
    movieID: String!
    directors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Subscription {
    _id: ID!
    userId: ID!
    type: SubscriptionType!
    paymentStatus: PaymentStatus!
  }

  enum SubscriptionType {
    BASIC
    STANDARD
    PREMIUM
  }

  enum PaymentStatus {
    PENDING
    PAID
    CANCELED
  }

  type Query {
    me: User
    subscriptionFind: Subscription
    subscriptions: [Subscription]
  }

  type Mutation {
    createSubscription(
      userId: ID!
      type: SubscriptionType!
      paymentStatus: PaymentStatus!
    ): Subscription!
    updateSubscription(
      userId: ID!
      type: SubscriptionType!
      paymentStatus: PaymentStatus!
    ): Subscription
    deleteSubscriptionByType(type: SubscriptionType!): Subscription
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(movieId: String!, title: String, link: String): User
    removeMovie(movieId: ID!): User
  }
`;

module.exports = typeDefs;
