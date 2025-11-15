import { useState } from "react";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Type from "./Pages/Type";
import MovieDetail from "./Pages/MovieDetail";

function App() {
  const [moviesList, setMoviesList] = useState({
    popular: null,
    top_rated: null,
    upcoming: null,
  });
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState({});
  const [searchPage, setSearchPage] = useState(1);
  return (
    <BrowserRouter>
      <Navbar
        query={query}
        searchData={searchData}
        searchPage={searchPage}
        setSearchPage={setSearchPage}
        setQuery={setQuery}
        setSearchData={setSearchData}
      />
      <Routes>
        <Route
          index
          element={
            <Home
              moviesList={moviesList}
              query={query}
              searchData={searchData}
              setSearchPage={setSearchPage}
              setMoviesList={setMoviesList}
            />
          }
        ></Route>
        <Route path="/movie/:id" element={<MovieDetail />}></Route>
        <Route
          path="/movies/:type"
          element={
            <Type moviesList={moviesList} setMoviesList={setMoviesList} />
          }
        ></Route>
        <Route path="/*" element={<h1>Error page</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
