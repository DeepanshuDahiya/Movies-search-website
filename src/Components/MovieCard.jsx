import React from "react";
import { Link } from "react-router";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} state={movie}>
      <div className="rounded-xl max-w-[200px] group relative overflow-hidden hover:scale-110 ease-in-out duration-200">
        <img
          src={`https://image.tmdb.org/t/p/original${
            movie.poster_path || movie.backdrop_path
          }`}
          alt={movie.title}
          loading="lazy"
          className="object-fill w-full h-[300px]"
        />
        <div className="overflow-hidden p-4 absolute bg-black/60 inset-0 opacity-0 group-hover:opacity-100">
          <h3 className="text-lg font-bold text-center">
            {movie.original_title}
          </h3>
          <div className="flex text-sm mt-2 justify-between">
            <p>{movie.release_date}</p>
            <p>{movie.vote_average}⭐</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
