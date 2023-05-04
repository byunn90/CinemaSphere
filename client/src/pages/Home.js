import React, { useState, useEffect } from "react";
import "../components/movieCard.css";
import {
  Jumbotron,
  Container,
  // Col,
  // Form,
  // Button,
  Card,
  CardColumns,
} from "react-bootstrap";
const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const API_KEY = `bb9bf4e9acc30780950de3e07fed784f`;

    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const { results } = await response.json();

        const movieData = results.slice(0, 18).map((movie) => ({
          movieId: movie.id,
          title: movie.title,
          overview: movie.overview,
          posterUrl: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
        }));

        setPopularMovies(movieData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container className="welcome">
          <h1>Welcome to Cinema Sphere!</h1>
          <p>Here are some popular movies to get you started:</p>
        </Container>
      </Jumbotron>

      <Container>
        <CardColumns>
          {popularMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border="dark" className="card">
                {movie.posterUrl ? (
                  <Card.Img
                    src={movie.posterUrl}
                    alt={`The cover for ${movie.title}`}
                    className="card-img-top"
                  />
                ) : null}
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Home;
