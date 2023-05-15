import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Container, Card, CardColumns } from "react-bootstrap";
import "../public/home.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [showPopularMovies, setShowPopularMovies] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const API_KEY = `bb9bf4e9acc30780950de3e07fed784f`;

    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const { results } = await response.json();

        const movieData = results.slice(0, 20).map((movie) => ({
          movieId: movie.id,
          title: movie.title,
          overview: movie.overview,
          posterUrl: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          description: movie.description,
        }));

        setPopularMovies(movieData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearchResults = (movies) => {
    setSearchedMovies(movies);
    setShowPopularMovies(false);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Container>
        {showPopularMovies && popularMovies.length > 0 && (
          <div className="section">
            <h2>Popular Movies</h2>
            <CardColumns>
              {popularMovies.map((movie) => (
                <Card
                  key={movie.movieId}
                  border="dark"
                  className="card"
                  onClick={() => handleMovieClick(movie)}
                >
                  {movie.posterUrl && (
                    <Card.Img
                      src={movie.posterUrl}
                      alt={`The cover for ${movie.title}`}
                      className="card-img-top"
                    />
                  )}
                </Card>
              ))}
            </CardColumns>
          </div>
        )}
        {!showPopularMovies && searchedMovies.length > 0 && (
          <div className="section">
            <h2>Search Results</h2>
            <CardColumns>
              {searchedMovies.map((movie) => (
                <Card
                  key={movie.movieId}
                  border="dark"
                  className="card"
                  onClick={() => handleMovieClick(movie)}
                >
                  {movie.posterUrl && (
                    <Card.Img
                      src={movie.posterUrl}
                      alt={`The cover for ${movie.title}`}
                      className="card-img-top"
                    />
                  )}
                </Card>
              ))}
            </CardColumns>
          </div>
        )}
      </Container>
      <MovieModal movie={selectedMovie} onHide={handleModalClose} />
    </>
  );
};

const MovieModal = ({ movie, onHide }) => {
  if (!movie) return null;

  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`The cover for ${movie.title}`}
              className="modal-poster"
            />
          ) : (
            <div className="placeholder-image" />
          )}
          <div className="modal-details">
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Rating: {movie.voteAverage} / 10</p>
            <p>{movie.overview}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} className="close-btn">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Home;
