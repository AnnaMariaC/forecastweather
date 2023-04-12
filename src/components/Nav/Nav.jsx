import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={style["main-meniu"]}>
      <menu>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : " ")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : " ")}
            to="/weather"
          >
            Weather
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : " ")}
            to="/forecast"
          >
            Forecast
          </NavLink>
        </li>
      </menu>
    </nav>
  );
}
