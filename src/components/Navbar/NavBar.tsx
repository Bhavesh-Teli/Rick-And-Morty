import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Rick & Morty Universe</div>
      <div className="navbar-links">
        <Link to="/">Characters</Link>
        <Link to="/episodes">Episodes</Link>
        <Link to="/locations">Locations</Link>
      </div>
    </nav>
  );
};

export default NavBar;
