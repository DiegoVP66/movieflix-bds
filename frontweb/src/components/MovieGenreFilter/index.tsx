import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Genre } from "types/genre";
import { requestBackend } from "util/request";

export type MovieFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieGenreFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);
  const { setValue, getValues, control } = useForm<MovieFilterData>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/genres`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      console.log(response.data);
      setSelectGenres(response.data);
    });
  }, []);

  const handleChangeGenre = (value: Genre) => {
    setValue("genre", value);

    const obj: MovieFilterData = {
      genre: getValues("genre"),
    };

    onSubmitFilter(obj);
  };
  return (
    <div className="base-card movie-search-container">
      <Controller
        name="genre"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={selectGenres}
            isClearable
            placeholder="Gênero"
            classNamePrefix="movie-crud-select"
            getOptionLabel={(genre: Genre) => genre.name}
            getOptionValue={(genre: Genre) => String(genre.id)}
            onChange={(value) => handleChangeGenre(value as Genre)}
          />
        )}
      />
    </div>
  );
};

export default MovieGenreFilter;
