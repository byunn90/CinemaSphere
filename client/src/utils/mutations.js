import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($input: MovieInput) {
    saveMovie(input: $input) {
      _id
      username
      movieCount
      savedMovies {
        movieId
        title
        overview
        posterUrl
        releaseDate
        voteAverage
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId: $movieId) {
      _id
      username
      movieCount
      savedMovies {
        movieId
        title
        overview
        posterUrl
        releaseDate
        voteAverage
      }
    }
  }
`;
export const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription(
    $userId: ID!
    $type: SubscriptionType!
    $paymentStatus: PaymentStatus!
  ) {
    createSubscription(
      userId: $userId
      type: $type
      paymentStatus: $paymentStatus
    ) {
      _id
      userId
      type
      paymentStatus
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation updateSubscription(
    $userId: ID!
    $type: SubscriptionType!
    $paymentStatus: PaymentStatus!
  ) {
    updateSubscription(
      userId: $userId
      type: $type
      paymentStatus: $paymentStatus
    ) {
      _id
      userId
      type
      paymentStatus
    }
  }
`;

export const DELETE_SUBSCRIPTION_BY_TYPE = gql`
  mutation deleteSubscriptionByType($type: SubscriptionType!) {
    deleteSubscriptionByType(type: $type) {
      _id
      type
    }
  }
`;
