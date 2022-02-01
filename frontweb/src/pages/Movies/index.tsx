import { NavLink } from "react-router-dom";
import "./styles.css";

const Movies = () => {
  return (
    <div className="movie-container">
      <h1>Tela listagem de filmes</h1>

      <div className="movie-list-container">
        <ul>
          <li>
            <NavLink to="/movies/1">Acessar /movies/1</NavLink>
          </li>
          <li>
            <NavLink to="/movies/2">Acessar /movies/2</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Movies;
