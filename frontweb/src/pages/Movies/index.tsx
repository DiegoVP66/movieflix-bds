import { AxiosRequestConfig } from "axios";
import MovieCrudCard from "components/MovieCrudCard";
import MovieGenreFilter, { MovieFilterData } from "components/MovieGenreFilter";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import { SpringPage } from "types/spring";
import { requestBackend } from "util/request";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/movies`,
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <>
      <div>
        <MovieGenreFilter onSubmitFilter={handleSubmitFilter} />
      </div>
      <div className="movie-list-container">
        <div className="col row ">
          {page?.content.map((movie) => (
            <div className=" col-sm-6  col-lg-6 col-xl-3" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <MovieCrudCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>

        <div className="movie-pagination-container">
          <Pagination
            pageCount={page ? page.totalPages : 0}
            range={3}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Movies;
