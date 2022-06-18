import React, { useEffect, useState } from "react";
import { fetchMovies } from "./api/api";
// require('dotenv').config();

function App() {

  const [movieData, setMovieData] = useState("");
  // const getData = async () => {
  //   const url = `https://api.themoviedb.org/3/trending/all/day?api_key={process.env.REACT_APP_SECRET_NAME}`

  //   const response = await fetch(url);
  //   try {
  //     const responseJson = await response.json()
  //     const data = (responseJson.results);
  //     setMovieData(data);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  useEffect(() => {
    fetchMovies().then((movieDatas) => {
      setMovieData(movieDatas || 'no user data');
    });
  }, []);
  // console.log(fetchMovies);

  return (
    <>
      {/* {movieData.map(movie=> {
        return (
          <div>
            {movie.name}
          </div>
        )
      })} */}
      <section className="lists">
        {movieData.map((item, key) => (
          <div key={key} title={item.title} items={item.items} />
        ))}
      </section>
      {movieData.total_pages}
      <p>print env secret to HTML</p>
    </>
  );
}

export default App;
