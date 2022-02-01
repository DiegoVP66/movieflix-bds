import { AxiosRequestConfig } from "axios";
import Button from "components/Button";
import MovieReviewCard from "components/MovieReviewCard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Review } from "types/review";
import { SpringList } from "types/spring";
import { hasAnyRoles } from "util/auth";
import { postNewReview, requestBackend } from "util/request";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

type FormData = {
  movieId: number;
  text: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<SpringList<Review>>();

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviews(response);
    });
  }, [movieId]);

  const onSubmit = (formData: FormData) => {
    formData.movieId = Number(movieId);
    console.log(formData.text);
    postNewReview(formData)
      .then((response) => {
        setHasError(false);
        reviews?.data.push(response.data);
        setValue("text", "");
      })
      .catch((error) => {
        setHasError(true);
        console.log(error);
      });
  };

  return (
    <div className="movie-details-container">
      <div className="top-text">
        <h1>{`Tela detalhes do filme id: ${movieId}`}</h1>
        {hasError && (
          <div className="alert alert-danger alert-container">
            Ops!Algum erro ocorreu...
          </div>
        )}
      </div>
      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <>
          <div className="card-container base-card">
            <div className="box-container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("text", {
                    required: "Campo não pode estar vazio",
                  })}
                  className={`form-control bg-white ${
                    errors.text ? "is-invalid" : ""
                  }`}
                  type="text"
                  placeholder="Deixe sua avaliação aqui "
                  name="text"
                />
                <div className="feedback d-block">{errors.text?.message}</div>
                <div className="sv-button-container">
                  <Button text="salvar" />
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <div className="movie-review-container base-card">
        {reviews?.data.map((item) => (
          <div key={item.id}>
            <MovieReviewCard review={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MovieDetails;
