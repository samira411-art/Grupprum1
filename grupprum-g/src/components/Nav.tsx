import { NavLink } from "react-router";

function Nav() {
  return (
    <nav className="nav">
      <span className="nav-title">Boka grupprum</span>
      <NavLink to="/">Hem</NavLink>
      <NavLink to="/rum">Rum</NavLink>
      <NavLink to="/mina-bokningar">Mina bokningar</NavLink>
    </nav>
  );
}

export default Nav;
