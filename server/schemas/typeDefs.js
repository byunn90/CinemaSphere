const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovies: [Movies]
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
    user: user
  }
  input MovieInput {
    movieID: String!
    directors: [String]
    description: String
    title: String!
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(username: , email: , password: ): Auth
    addUser(username: email: password): Auth
    saveMovie()
    removeMovie()
  }
`;

module.exports = typeDefs;
