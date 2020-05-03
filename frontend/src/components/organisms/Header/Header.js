import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AuthContext, roles } from "../../../store/contexts/auth";

import "./Header.scss";
const MENU_LINKS = [
  {
    link: "/admin",
    text: "Admin",
    requiredRole: roles.admin,
  },
  {
    link: "/gallery",
    text: "Gallery",
  },
  {
    link: "/about",
    text: "About",
  },
  {
    link: "/contact",
    text: "Contact",
  },
];

export default function Header() {
  const { state: authState } = useContext(AuthContext);
  let [isNavOpen, setIsNavOpen] = useState(false);

  const mapToNavLink = (entry) => {
    // if a role is required and current user does not cover it -> do not show link
    if (entry.requiredRole && authState.role < entry.requiredRole) {
      return null;
    }

    return (
      <NavLink
        to={entry.link}
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="nav-link"
        key={entry.link}
      >
        {entry.text}
      </NavLink>
    );
  };
  return (
    <header>
      <NavLink to="/">
        <div className="title">Damyan Georgiev photography</div>
      </NavLink>

      <div className="nav-menu">
        <FaBars
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="hamburger"
        />

        <nav className={isNavOpen ? "" : " closed"}>
          {MENU_LINKS.map(mapToNavLink)}
        </nav>
      </div>
    </header>
  );
}
