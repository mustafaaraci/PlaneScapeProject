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
  const [tripType, setTripType] = useState("one-way");

  const handleFilter = () => {
    if (
      !departureAirport ||
      !arrivalAirport ||
      !departureDate ||
      (tripType === "round" && !returnDate)
    ) {
      toast.error("Lütfen tüm alanları doldurun.", {
        autoClose: 3000,
        pauseOnHover: false,
      });
      return;
    }

    if (departureAirport.toLowerCase() === arrivalAirport.toLowerCase()) {
      toast.error("Gidiş ve dönüş havaalanları aynı olamaz!", {
        autoClose: 3000,
        pauseOnHover: false,
      });
      return;
    }

    if (
      tripType === "round" &&
      new Date(returnDate) < new Date(departureDate)
    ) {
      toast.error("Dönüş tarihi gidiş tarihinden önce olamaz!", {
        autoClose: 3000,
        pauseOnHover: false,
      });
      return;
    }

    const filteredFlights = Flights.filter((flight) => {
      const flightScheduleDate = flight.scheduleDate;
      const isRoundTrip = tripType === "round";
      const returnDateMatch = isRoundTrip
        ? flight.returnScheduleDate === returnDate
        : true;

      return (
        flight.prefixIATA.toLowerCase() === departureAirport.toLowerCase() &&
        flight.route.destinations[0].toLowerCase() ===
          arrivalAirport.toLowerCase() &&
        flightScheduleDate === departureDate &&
        returnDateMatch
      );
    });

    console.log("Filtrelenmiş Uçuşlar:", filteredFlights);

    if (filteredFlights.length === 0) {
      toast.error("Böyle bir uçuş bulunamadı!", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    } else {
      toast.success(`${filteredFlights.length} adet uçuş bulundu!`, {
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
        <div className="header-container">
          <h2 className="flight-title">
            <MdFlight className="head-icon" />
            BOOK YOUR FLIGHT
          </h2>
          <div className="trip-type-buttons">
            <button
              className={`trip-button round ${
                tripType === "round" ? "active" : ""
              }`}
              onClick={() => setTripType("round")}
            >
              Round Trip
            </button>
            <button
              className={`trip-button one-way ${
                tripType === "one-way" ? "active" : ""
              }`}
              onClick={() => setTripType("one-way")}
            >
              One Way
            </button>
          </div>
        </div>
        <div className="input-container">
          <div className="input-departure">
            <FaPlaneDeparture className="icon" />
            <input
              type="text"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              placeholder="departure..."
            />
          </div>
          <div className="input-arrival">
            <FaPlaneArrival className="icon" />
            <input
              type="text"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              placeholder="arrival..."
            />
          </div>
          <div className="date-inputs">
            <input
              className={`date-left ${
                tripType === "one-way" ? "rounded-left" : ""
              }`}
              type="date"
              placeholder="Gidiş Tarihi"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />

            {tripType === "round" && (
              <input
                className="date-right"
                type="date"
                placeholder="Dönüş Tarihi"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            )}
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
