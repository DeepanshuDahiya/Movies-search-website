import { useEffect, useRef, useState } from "react";
import MovieCard from "../Components/MovieCard";

export default function Home({ moviesList, setMoviesList, searchData, query }) {
  const [pageNumber, setPageNumber] = useState(1);
  const loadRef = useRef();
  useEffect(() => {
    if (moviesList?.popular?.[pageNumber]) return;
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) =>
        setMoviesList((prev) => ({
          ...prev,
          popular: { ...prev?.popular, [pageNumber]: data?.results },
        }))
      );
  }, [pageNumber]);

  useEffect(() => {
    if (!query) {
      const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0];
          if (target.isIntersecting) {
            setPageNumber((prev) => prev + 1);
          }
        },
        { threshold: 0.2 }
      );

      if (loadRef.current) {
        observer.observe(loadRef.current);
      }

      return () => {
        if (loadRef.current) {
          observer.unobserve(loadRef.current);
        }
        observer.disconnect();
      };
    }
  }, [moviesList]);

  return !moviesList?.popular ? (
    <h1 className="text-center mt-10">Loading...</h1>
  ) : (
    <div className="w-[90%] mx-auto mt-10">
      <h2 className="text-2xl font-bold">POPULAR</h2>
      <div className="flex flex-wrap justify-center items-center mt-10 gap-7">
        {(searchData[query]?.length
          ? searchData?.[query]
          : Object.values(moviesList.popular).flat()
        ).map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
      <div ref={loadRef} className="h-10"></div>
    </div>
  );
}
