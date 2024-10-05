import React from "react";
import { Link } from "react-router-dom";
import "../css/HeroSection.css";
import "../css/FlightsList.css";
import { FaCar } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import FlightSearch from "./FlightSearch";
import FlightsList from "./FlightsList";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <FlightSearch />
        <FlightsList />
      </div>
      <div className="hero-containers">
        <Link to="/car-rentals" className="container-item">
          <img src="./src/images/car-rentals.jpg" alt="container-1" />
          <h2>
            CAR RENTALS <FaCar className="hero-icons" />
          </h2>
        </Link>
        <Link to="/hotels" className="container-item">
          <img src="./src/images/hotels.jpg" alt="container-2" />
          <h2>
            HOTELS <FaHotel className="hero-icons" />
          </h2>
        </Link>
        <Link to="/travel-packages" className="container-item">
          <img src="./src/images/travel.jpg" alt="container-3" />
          <h2>
            TRAVEL PACKAGES <FaUmbrellaBeach className="hero-icons" />
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
