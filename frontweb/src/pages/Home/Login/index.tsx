import { AuthContext } from "AuthContext";
import Button from "components/Button";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { getTokenData } from "util/auth";
import { requestBackendLogin } from "util/request";
import { saveAuthData } from "util/storage";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

type LoactionState = {
  from: string;
};

const Login = () => {
  const location = useLocation<LoactionState>();

  const { from } = location.state || { from: { pathname: "/movies" } };

  const { setAuthContextData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useHistory();

  const [hasError, setHasError] = useState(false);

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log(error);
      });
  };

  return (
    <div className=" base-card login-card-container">
      <h1>Login</h1>
      {hasError && (
        <div className="alert alert-danger alert-container">
          Erro ao tentar efetuar o login
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="base-input">
          <input
            {...register("username", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            type="text"
            className={`form-control bg-white ${
              errors.username ? "is-invalid" : ""
            }`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>

        <div className="base-input">
          <input
            {...register("password", {
              required: "Campo obrigatório",
            })}
            type="password"
            className={`form-control bg-white ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <div className="login-button-container">
          <Button text="FAZER LOGIN" />
        </div>
      </form>
    </div>
  );
};

export default Login;
