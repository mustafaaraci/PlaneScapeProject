import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredFlights } from "../redux/FlightProductSlice";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdFlight } from "react-icons/md";
import "../css/FlightSearch.css";

const FlightSearch = () => {
  const { Flights } = useSelector((state) => state.flights);
  const dispatch = useDispatch();
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleFilter = () => {
    if (!departureAirport || !arrivalAirport || !departureDate || !returnDate) {
      toast.error("Lütfen tüm alanları doldurun.", {
        autoClose: 3000,
        pauseOnHover: false,
      });
      return;
    }

    const filteredFlights = Flights.filter((flight) => {
      const flightScheduleDate = flight.scheduleDate;

      const flightReturnDate = flight.scheduleDate;

      return (
        flight.prefixIATA === departureAirport &&
        flight.route.destinations[0] === arrivalAirport &&
        flightScheduleDate === departureDate &&
        flightReturnDate === returnDate
      );
    });

    console.log("Filtrelenmiş Uçuşlar:", filteredFlights);

    if (filteredFlights.length === 0) {
      toast.error("Bu tarihte uçuş yok!", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    } else {
      toast.success("Uçuş bulundu!", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    }

    dispatch(setFilteredFlights(filteredFlights));
  };

  return (
    <div className="flight-search-container">
      <ToastContainer />
      <div className="flight-search">
        <h2 className="flight-title">
          <MdFlight className="head-icon" />
          BOOK YOUR FLIGHT
        </h2>
        <div className="input-container">
          <div className="input-departure">
            <FaPlaneDeparture className="icon" />
            <input
              type="text"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
          </div>
          <div className="input-arrival">
            <FaPlaneArrival className="icon" />
            <input
              type="text"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
          </div>
          <div className="date-inputs">
            <input
              className="date-left"
              type="date"
              placeholder="Gidiş Tarihi"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <input
              className="date-right"
              type="date"
              placeholder="Dönüş Tarihi"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>
        <button className="filter-button" onClick={handleFilter}>
          Show Flights
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;
