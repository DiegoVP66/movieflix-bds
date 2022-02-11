import "./styles.css";

type Props = {
  title: string;
  subtitle: string;
  imgUrl: string;
  year: number;
  synopsis: string;
};

const MovieInfo = ({ title, subtitle, imgUrl, year, synopsis }: Props) => {
  return (
    <div className="movie-base-card">
      <div className="movie-base-card-info-top">
        <img src={imgUrl} alt={title} />
      </div>
      <div>
        <div className="movie-base-card-info-middle">
          <h6>{title}</h6>
          <h3>{year}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="movie-base-card-bottom-container">
          <p>{synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
