import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="wrap container">
        <div className="brand">T-Shirt Shop</div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/category">Categories</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;