import { Link, useLocation } from "react-router";
import Logo from "../assets/logo.png";
import { useEffect } from "react";

export default function Navbar({
  query,
  setQuery,
  searchData,
  setSearchData,
  // searchPage,
  // setSearchPage,
}) {
  const { pathname } = useLocation();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjRjODY3OWIwZDhjMzhhZDA3YWRmMzI3ODRlODk0YyIsIm5iZiI6MTc2MjQxMjE4MC4yNDcsInN1YiI6IjY5MGM0Njk0ZjRiYzJlOWU4MmI2OTkyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rjyJW0EBOI71pXU4KvaEsPNxOwK4jvo5vQ4bwENTz34",
    },
  };

  function fetchSearch() {
    if (searchData[query]?.length) return;
    fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${query}`,
      options
    )
      .then((res) => res.json())
      .then((res) =>
        setSearchData((prev) => ({ ...prev, [query]: res.results }))
      )
      .catch((err) => console.error(err));
  }

  // useEffect(() => {
  //   if (searchPage === 1) return;
  //   fetchSearch();
  // }, [searchPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearch();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="flex justify-between p-3">
      <div className="flex flex-wrap items-center text-lg font-bold gap-5">
        <Link to={"/"} className="w-18">
          <img src={Logo} alt="Logo Img" className="object-contain" />
        </Link>
        <div className="flex flex-wrap text-lg font-bold gap-5">
          <Link to={"/movies/popular"}>Popular</Link>
          <Link to={"/movies/top_rated"}>Top Rated</Link>
          <Link to={"/movies/upcoming"}>Upcoming</Link>
        </div>
      </div>
      {pathname === "/" && (
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value.trim())}
            className="bg-white text-black p-2 w-[30vw] rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
