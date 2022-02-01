import { ReactComponent as Banner } from "assets/images/banner.svg";
import Login from "./Login";
import "./styles.css";

const Home = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Avalie Filmes</h1>
        <p>
          Diga o que você achou do seu <br />
          filme favorito
        </p>
        <Banner />
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default Home;
