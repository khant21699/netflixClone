import React, { useEffect } from "react";
import { useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Request";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">{movie?.title || movie?.name}</h1>
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => {
              navigate(`/movie/${movie.id}`);
            }}
          >
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(`${movie?.overview}`, 150)}
        </h1>
      </div>
      <div className="fade--bottom" />
    </div>
  );
};

export default Banner;
