import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import "./MovieScreen.css";
import { getDocs } from "firebase/firestore";
import requests from "../Request";
import { API_KEY } from "../Request";
import NavBar from "../NavBar";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import db from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const MovieScreen = () => {
  const [listed, setListed] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const imgpath = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";

  const backGroundpath = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
    : `https://springboard-cdn.appadvice.com/wp-content/appadvice-v2-media/2016/11/Netflix-background_860c8ece6b34fb4f43af02255ca8f225-xl.jpg`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `${requests.fetchSingleMovie}${id}?api_key=${API_KEY}&append_to_response=videos`
      );
      setMovie(request.data);
      console.log(request.data);
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  async function addToList(e) {
    await addDoc(collection(db, user.uid), {
      id: movie,
    });
    e.target.classList.add("listed");
  }

  async function getData() {
    const docRef = collection(db, user.uid);
    // const docSnap = onSnapshot(docRef)
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.data().id.id);
      //   console.log(id);
      if (doc.data().id.id == id) {
        console.log("emmm");
        setListed(true);
      }
      // console.log(doc.id, " => ", doc.data());
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="movieScreen"
      style={{
        backgroundImage: `url(${backGroundpath})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
      }}
    >
      <NavBar />
      {movie.length < 1 ? (
        <h1 className="movieScreen__notFound">Finding Data Please Wait.</h1>
      ) : (
        <div className="movieScreen_container">
          <div className="movieScreen__details__text">
            <h1>{movie.title}</h1>
            <h2>Watch Movie Online</h2>
            <h2>Rating: {movie.vote_average}</h2>
          </div>
          <div className="movieScreen__details">
            <div className="movieImg">
              <img src={imgpath} alt="" />
            </div>
            <div className="movieScreen__detail">
              <h2>Language</h2>
              <ul>
                {movie.spoken_languages.map((lang) => {
                  return <li key={lang.english_name}>{lang.english_name}</li>;
                })}
              </ul>
              <h2>Status: {movie.status}</h2>
              <h2>Relase Date: {movie.release_date}</h2>
              <h2>Rating: {movie.vote_average}</h2>
              <h2>Overview</h2>
              <p>{movie.overview}</p>

              <div>
                <button
                  className="movieScreen__backbtn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back
                </button>
                <button
                  className={`movieScreen__addToListbtn ${
                    listed ? "listed" : ""
                  }`}
                  onClick={addToList}
                >
                  Add to list
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <button onClick={() => console.log(movie.id)}>suisdajnui</button> */}
    </div>
  );
};

export default MovieScreen;
