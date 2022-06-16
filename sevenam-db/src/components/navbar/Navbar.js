import "./Navbar.css";
import Weather from "./Weather"

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-title">
      <a href="/" id="nav-title-text">
        SevenAM
      </a>
      </div>
      <ul>
        <li>
          <a href="/placeholder">All Routes</a>
        </li>
        <li>
          <a href="/placeholder">News</a>
        </li>
        <li>
        <a href="/about">About Us</a>
        </li>
      </ul>
      <Weather/>
    </nav>
  );
};

export default Navbar;
