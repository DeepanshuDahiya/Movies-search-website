import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

export default function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState(null);
  const location = useLocation();
  const state = location.state;
  const { id } = useParams();

  useEffect(() => {
    if (location) {
      setMovieDetail(state);
    }
  }, []);

  useEffect(() => {
    if (!state) {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => setMovieDetail(data));
    }
  }, [id]);

  if (!movieDetail) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-6">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.poster_path})`,
        }}
      ></div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className="rounded-xl shadow-lg w-[250px]"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">
            {movieDetail.original_title}
          </h1>

          <p className="text-gray-300 mb-2">
            ⭐ {movieDetail.vote_average} / 10
            <span className="text-sm text-gray-400">
              {" "}
              ({movieDetail.vote_count} votes)
            </span>
          </p>

          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">Release Date:</span>{" "}
            {movieDetail.release_date}
          </p>

          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">Genres:</span>{" "}
            {movieDetail.genres?.map((g) => g.name).join(", ")}
          </p>

          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">
              Production Companies:
            </span>{" "}
            {movieDetail.production_companies?.map((c) => c.name).join(", ")}
          </p>

          <p className="text-gray-300 mb-4">
            <span className="font-semibold text-white">
              Production Countries:
            </span>{" "}
            {movieDetail.production_countries?.map((c) => c.name).join(", ")}
          </p>

          <p className="text-gray-200 leading-6">
            <span className="font-semibold text-white">Description:</span>{" "}
            {movieDetail.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
