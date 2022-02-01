import { AuthContext } from "AuthContext";
import LogoutButton from "components/LogoutButton";
import { useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getTokenData, isAuthenticated } from "util/auth";
import { removeAuthData } from "util/storage";
import "./styles.css";

type LocationState = {
  from: string;
};

const Navbar = () => {
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: "/" } };

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace(from);
  };

  return (
    <nav className="navbar-container">
      <div className="nav-title-container">
        <Link className="link" to="/movies">
          <h1>MovieFlix</h1>
        </Link>
      </div>
      <div className="button-container">
        {authContextData.authenticated ? (
          <div>
            <Link to="/" onClick={handleLogoutClick}>
              <LogoutButton text="sair" />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
