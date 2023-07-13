import { useEffect, useState } from "react";
import { getMovies } from "./Movies.DB";
import { TrashIcon } from "@heroicons/react/24/outline";

import MovieDetailModal from "./MovieDetailModal";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState(getMovies());
  const [currentPage, setCurrentpage] = useState(1);
  const [viewableMovies, setViewableMovies] = useState(filteredMovies);

  const [selectedMovieForModal, setSelectedMovieForModal] = useState({});

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const pageItems = 5;
  useEffect(() => {
    let firstIndex = (currentPage - 1) * pageItems;
    const lastIndex = firstIndex + pageItems;

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);

    setViewableMovies(filteredMovies.slice(firstIndex, lastIndex));
  }, [searchTerm, currentPage]);

  return (
    <div>
      <div>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-3px py-2 px-2 w-1/3 flex justify-start"
        ></input>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>In Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {viewableMovies.map((movie, index) => {
            return (
              <tr key={movie._id}>
                <td>{movie._id}</td>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td className="flex">
                  <button
                    className="mr-2 px-4 py-2 bg-blue-500 text-blue rounded-md"
                    onClick={() => {
                      setSelectedMovieForModal(movie)
                      setIsOpen(true);
                    }}
                  >
                    View
                  </button>

                  <TrashIcon class="h-6 w-6 text-gray-500" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex ">
        {Array.from(
          Array(Math.ceil(filteredMovies.length / pageItems)).keys()
        ).map((item) => [
          <div
            key={item}
            className="rounded-full py-2 px-3 flex"
            onClick={() => setCurrentpage(item + 1)}
          >
            {item + 1}
          </div>,
        ])}
      </div>
      <MovieDetailModal
      isOpen = {isOpen}
      closeModal = {closeModal}
      data = {selectedMovieForModal}
      />
    </div>
  );
}
