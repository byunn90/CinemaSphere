import React, { useState, useEffect } from "react";
import "../public/movieCard.css";
import { Container, Card, CardColumns } from "react-bootstrap";

const TvShows = () => {
  const [popularTvShows, setPopularTvShows] = useState([]);

  useEffect(() => {
    const API_KEY = `bb9bf4e9acc30780950de3e07fed784f`;

    const fetchPopularTvShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const { results } = await response.json();

        const tvShowData = results.slice(0, 20).map((tvShow) => ({
          tvShowId: tvShow.id,
          name: tvShow.name,
          overview: tvShow.overview,
          posterUrl: `https://image.tmdb.org/t/p/w200/${tvShow.poster_path}`,
          firstAirDate: tvShow.first_air_date,
          voteAverage: tvShow.vote_average,
        }));

        setPopularTvShows(tvShowData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopularTvShows();
  }, []);

  return (
    <>
      <Container>
        <CardColumns>
          {popularTvShows.map((tvShow) => {
            return (
              <Card key={tvShow.tvShowId} border="dark" className="card">
                {tvShow.posterUrl ? (
                  <Card.Img
                    src={tvShow.posterUrl}
                    alt={`The cover for ${tvShow.name}`}
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

export default TvShows;
