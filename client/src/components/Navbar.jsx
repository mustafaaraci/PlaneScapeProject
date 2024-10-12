import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { MdFlight } from "react-icons/md";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { PiAirplaneTakeoffLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className="logo-container">
            <MdFlight className="logo-flight" />
          </div>
          PLANE SCAPE
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/myflight"
                activeClassName="active"
              >
                <PiAirplaneTakeoffLight className="icon-myflight" />
                MyFlight
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/deals"
                activeClassName="active"
              >
                <MdOutlineAirplaneTicket className="icon-deals" />
                Deals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/discover"
                activeClassName="active"
              >
                <BiWorld className="icon-discover" />
                Discover
              </NavLink>
            </li>
            <li className="nav-item">
              <div className="user-photo">
                <Link to="/profile">
                  <img src="./src/images/user-img-1.jpeg" alt="User" />
                </Link>
              </div>
              <NavLink className="nav-link" to="/profile">
                Mustafa Aracı
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
