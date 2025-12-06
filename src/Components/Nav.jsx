import { NavLink, Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <i className="fa-solid fa-couch me-2"></i>
        FURNITURE
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* FIXED missing collapse wrapper */}
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#products"
              id="productsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Products
            </a>

            <ul className="dropdown-menu" aria-labelledby="productsDropdown">
              <li>
                <NavLink className="dropdown-item" to="/category/bedrooms">
                  Bedrooms
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/category/living-room">
                  Living Room
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/category/dining-room">
                  Dining Room
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/category/sofas">
                  Sofas
                </NavLink>
              </li>
              <li><hr className="dropdown-divider" /></li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/blog">Blog</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
          </li>

          <li className="nav-item ms-2">
            <NavLink className="nav-link" to="/login">Sign In</NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Nav;
