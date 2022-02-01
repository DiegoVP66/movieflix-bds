import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { isAuthenticated } from "util/auth";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        {isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/movies",
            }}
          />
        ) : (
          <Route exact path="/">
            <Home />
          </Route>
        )}
      </Route>
      <PrivateRoute path="/movies" exact>
        <Movies />
      </PrivateRoute>
      <PrivateRoute path="/movies/:movieId" exact={false}>
        <MovieDetails />
      </PrivateRoute>
    </Switch>
  </BrowserRouter>
);

export default Routes;
