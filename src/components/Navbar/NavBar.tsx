import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/" className="navbar-home-link">Rick & Morty Universe</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Characters</Link>
        <Link to="/locations">Locations</Link>
        <Link to="/episodes">Episodes</Link>
      </div>
    </nav>
  );
};

export default NavBar;
