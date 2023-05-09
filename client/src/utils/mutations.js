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
  mutation createSubscription($input: SubscriptionType!) {
    createSubscription(input: $input) {
      id
      user {
        _id
      }
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation updateSubscription(
    $subscriptionId: ID!
    $type: SubscriptionType!
    $paymentStatus: PaymentStatus!
  ) {
    updateSubscription(
      id: $subscriptionId
      input: { type: $type, paymentStatus: $paymentStatus }
    ) {
      id
      user {
        _id
      }
    }
  }
`;
export const DELETE_SUBSCRIPTION = gql`
  mutation deleteSubscription($subscriptionId: ID!) {
    deleteSubscription(id: $subscriptionId) {
      id
      user {
        _id
      }
    }
  }
`;
