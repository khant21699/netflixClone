import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import "./HomeScreen.css";
import NavBar from "../NavBar";
import requests from "../Request";
import Row from "../Row";
import { collection, doc, onSnapshot, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import MyListRow from "../MylistRow";

const HomeScreen = () => {
  var favMovies = [];
  const [mylist, setMylist] = useState(null);
  const user = useSelector(selectUser);
  async function getData() {
    const docRef = collection(db, user.uid);
    // const docSnap = onSnapshot(docRef)
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      favMovies = [...favMovies, doc.data()];

      // console.log(doc.id, " => ", doc.data());
    });
    setMylist(favMovies);
    console.log(favMovies);
    favMovies = [];
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="homeScreen">
      <NavBar />

      {/* nav  */}

      <Banner />
      {/* banner */}

      <Row
        title="Netflix Orifinal"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movie" fetchURL={requests.fetchActionMovie} />
      <Row title="Comedy Movie" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movie" fetchURL={requests.fetchHorrorMovie} />
      <Row title="Romance Movie" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentries} />
      <Row title="Dramas" fetchURL={requests.fetchDramaMovies} />
      {!mylist ? (
        <></>
      ) : (
        <MyListRow title="My List" movies={mylist} isLargeRow></MyListRow>
      )}

      {/* row */}
    </div>
  );
};

export default HomeScreen;
