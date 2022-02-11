import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
};

const MovieCrudCard = ({ movie }: Props) => {
  return (
    <div className="base-card movie-crud-card">
      <div className="movie-crud-card-top-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>

      <div className="movie-card-bottom">
        <div>
          <h1>{movie.title}</h1>
        </div>
        <div>
          <h3>{movie.year}</h3>
        </div>
        <div>
          <p>{movie.subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCrudCard;
