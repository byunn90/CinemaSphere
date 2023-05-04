import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
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
