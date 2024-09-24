import React from "react";
import { Link } from "react-router-dom"; 
import "../css/Navbar.css";
import { MdFlight } from "react-icons/md";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { PiAirplaneTakeoffLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"> 
            <div className="logo-container">
              <MdFlight className="logo-flight" />
            </div>
            PLANE SCAPE
            </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto"> 
              <li className="nav-item">
              <Link className="nav-link active"to="/myflight">< PiAirplaneTakeoffLight className="icon-myflight"/>MyFlight</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/deals"> 
                  <MdOutlineAirplaneTicket className="icon-deals"/>Deals
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/discover"> 
                  <BiWorld className="icon-discover"/>Discover
                </Link>
              </li>
              <li className="nav-item">
                <div className="user-photo">
                  <Link to="/profile"> 
                    <img src="./src/images/user-img-1.jpeg" alt="User" />
                  </Link>
                </div>
                <Link className="nav-link active" to="/profile"> 
                  Mustafa Aracı
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;