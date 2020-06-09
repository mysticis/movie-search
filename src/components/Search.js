import React, { useState, useEffect } from "react";
import { Grommet, Box, TextInput, Text, Heading } from "grommet";
import { Search } from "grommet-icons";
import axios from "axios";

import movieInstance from "./movie";

const API_KEY = process.env.REACT_APP_API_KEY;

const SuggestionsTextInput = () => {
  const [value, setValue] = useState("");
  const [movie, setMovie] = useState(movieInstance);
  const [movieID, setMovieID] = useState(77883);
  const [results, setResults] = useState([]);
  const onChange = (event) => setValue(event.target.value);

  //Sets movie ID on item select
  const onSelect = (event) => {
    setValue(event.suggestion);
    setMovieID(
      results.filter((show) => show.original_title === event.suggestion)[0].id
    );
  };

  //Default background styles/animation
  const backgroundStyles = {
    dark: true,
    opacity: "strong",
    position: "bottom",
    repeat: "no-repeat",
    size: "cover",
    image: `url(
          https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
  };
  const animation = {
    type: "fadeIn",
    delay: 2000,
    duration: 2000,
    size: "xsmall",
  };
  const margin = {
    left: "none",
    bottom: "small",
  };
  const dropAlign = {
    top: "bottom",
  };
  const height = { min: "10rem" };

  //request the particular movie with the movie ID instatiated above
  useEffect(() => {
    const getMovie = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`
      );

      setMovie(response.data);
    };
    getMovie();
  }, [movieID]);

  //get movie search results from api
  useEffect(() => {
    const getSuggestions = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}`
      );

      setResults(response.data.results);
    };
    getSuggestions();
  }, [value]);

  //Utils
  const numberWithCommas = () => {
    return movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const date = new Date(movie.release_date.toString());
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return (
    <Grommet>
      <Box
        fill
        align="center"
        justify="start"
        pad="large"
        background={backgroundStyles}
        animation={animation}
        responsive={true}
      >
        <Box width="medium" responsive={true}>
          <TextInput
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            dropHeight="medium"
            dropAlign={dropAlign}
            placeholder="Search movie.."
            icon={<Search />}
            reverse
            suggestions={results
              .filter((result) => {
                return result.original_title
                  .toLowerCase()
                  .includes(value.toLowerCase());
              })
              .map((result) => {
                return result.original_title;
              })}
          />
        </Box>
        {movie && (
          <Box
            direction="row"
            pad="none"
            alignContent="center"
            round={true}
            width="large"
            responsive={true}
            justify="center"
            height="large"
            flex={true}
            margin="large"
          >
            <Box width="medium" height={height}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
            </Box>
            <Box
              width="medium"
              pad="medium"
              opacity="weak"
              background="#999999"
            >
              <Heading level={3} color="grey" margin={margin}>
                Title:
              </Heading>{" "}
              <Text color="green" alignSelf="start">
                {movie.original_title}
              </Text>
              <Heading level={3} color="grey" margin={margin}>
                Release Date:
              </Heading>
              <Text color="green" alignSelf="start">
                {`${month} ${day}, ${year}`}
              </Text>
              <Heading level={3} color="grey" margin={margin}>
                Revenue:
              </Heading>
              <Text color="green" alignSelf="start">
                ${numberWithCommas()}
              </Text>
              <Heading level={3} color="grey" margin={margin}>
                Tagline:
              </Heading>
              <Text color="green" alignSelf="start">
                {movie.tagline}
              </Text>
              <Heading level={3} color="grey" margin={margin}>
                Vote Average:
              </Heading>
              <Text color="green" alignSelf="start">
                {movie.vote_average}
              </Text>
              <Heading level={3} color="grey" margin={margin}>
                Runtime:
              </Heading>
              <Text color="green" alignSelf="start">
                {movie.runtime} minutes
              </Text>
              <Heading level={3} color="grey" margin={margin}>
                Genres:
              </Heading>
              {movie.genres.map((g) => (
                <Text key={g.id} color="green">
                  {g.name}
                </Text>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Grommet>
  );
};

export default SuggestionsTextInput;
