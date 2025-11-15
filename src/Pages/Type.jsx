import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import MovieCard from "../Components/MovieCard";

export default function Type({ moviesList, setMoviesList }) {
  const { type } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const loadRef = useRef();

  function fetchData() {
    fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) =>
        setMoviesList((prev) => ({
          ...prev,
          [type]: { ...prev[type], [pageNumber]: data.results },
        }))
      );
  }

  useEffect(() => {
    if (pageNumber === 1) return;
    if (moviesList?.[type]?.[pageNumber]) return;
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    if (moviesList?.[type]?.[pageNumber]) return;
    fetchData();
  }, [type]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPageNumber((prev) => prev + 1);
        }
      },
      { threshold: 0.2 }
    );

    if (loadRef?.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef?.current) observer.unobserve(loadRef.current);
      observer.disconnect();
    };
  }, [moviesList]);

  return !moviesList?.[type] ? (
    <h1 className="text-center mt-10">Loading...</h1>
  ) : (
    <div className="w-[90%] mx-auto mt-10">
      <h2 className="text-2xl font-bold">
        {type === "top_rated" ? "TOP RATED" : type.toUpperCase()}
      </h2>
      <div className="flex flex-wrap justify-center items-center\ mt-10 gap-7  pb-20  overflow-auto">
        {Object.values(moviesList[type])
          .flat()
          .map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
      </div>
      <div ref={loadRef} className="h-5"></div>
    </div>
  );
}
