import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Row.css";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "./Request";
import requests from "./Request";

const MyListRow = ({ title, isLargeRow = false, movies = null }) => {
  const [Movies, setMovies] = useState(movies);
  const navigate = useNavigate();
  var mylist = [];
  const base_url = "https://image.tmdb.org/t/p/original/";
  //   const fetchData = () => {
  //     favmovie.map(async (mov) => {
  //       const request = await axios.get(
  //         `${requests.fetchSingleMovie}${mov.id}?api_key=${API_KEY}&language=en-US`
  //       );
  //       setMylist([request.data]);

  //       console.log(request.data);
  //     });

  //     console.log(mylist);
  //   };
  //   useEffect(() => {
  //     function fetchData() {
  //       mylist.length = 0;

  //       favmovie.map(async (mov) => {
  //         var id = mov.id;
  //         console.log(id);
  //         const request = await axios.get(
  //           `/movie/${id}?api_key=3054e88c6b70a81bdde0ca635bc60be5&language=en-US`
  //         );
  //         // const request = axios.get(
  //         //   `/movie/${id}?api_key=3054e88c6b70a81bdde0ca635bc60be5&language=en-US`
  //         // );

  //         // console.log(request.data);
  //         mylist = [...mylist, request.data];
  //         console.log(mylist);
  //         return request;
  //       });

  //       //   setMovies(mylist);
  //     }
  //     fetchData();
  //   }, []);

  return (
    <div className="row">
      {/* {movies ? (
        Movies.map((movie) => {
          return <h1 key={movie.id.id}>{movie.id.title}</h1>;
        })
      ) : (
        <h1>shibuu</h1>
      )} */}
      <h2>{title}</h2>
      {movies ? (
        <div className="row__posters">
          {Movies.map((movie) => {
            return (
              ((isLargeRow && movie.id.poster_path) ||
                (!isLargeRow && movie.id.backdrop_path)) && (
                <img
                  onClick={() => {
                    navigate(`./movie/${movie.id.id}`);
                  }}
                  className={`row__poster ${isLargeRow && "poster__large"}`}
                  key={`${movie.id.id}mylist`}
                  src={`${base_url}${
                    isLargeRow ? movie.id.poster_path : movie.id.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyListRow;
