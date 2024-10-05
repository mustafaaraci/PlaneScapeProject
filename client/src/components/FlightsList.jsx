import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlights } from "../redux/FlightProductSlice";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const FlightsList = () => {
  const dispatch = useDispatch();
  const { Flights, loading, error } = useSelector((state) => state.flights);

  useEffect(() => {
    dispatch(getAllFlights());
  }, [dispatch]);

  return (
    <div className="flights-list">
      {loading ? (
        <div className="loading">
          <Spinner animation="border" style={{ color: "purple" }} />
        </div>
      ) : error ? (
        <p>Server bağlantısı yapılmadı!!!</p>
      ) : !Array.isArray(Flights) || Flights.length === 0 ? (
        <p>Uçuş verileri bulunamadı.</p>
      ) : (
        Flights.map((flight) => (
          <div className="flight-container" key={flight.id}>
            <div className="flight-card">
              <div className="flight-info">
                <div className="left-info">
                  <h4>{flight.route.destinations[0]}</h4>
                  <div className="departure-info">
                    <FaPlaneDeparture className="icon-departure" />
                    <p>Departure</p>
                  </div>
                  <p>
                    <strong>
                      {new Date(flight.scheduleDateTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </strong>
                  </p>
                  <p>Airport: {flight.prefixIATA}</p>
                </div>
                <div className="center-info">
                  <MdFlight className="icon-info" />
                  <p>Duration: {flight.duration || "Bilinmiyor"}</p>
                </div>
                <div className="right-info">
                  <h4>
                    {flight.route.destinations[1] ||
                      flight.publicFlightState.flightStates[0] ||
                      "Bilinmiyor"}
                  </h4>
                  <div className="arrival-info">
                    <FaPlaneArrival className="icon-arrival" />
                    <p>Arrival</p>
                  </div>
                  <p>
                    <strong>
                      {new Date(flight.actualLandingTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </strong>
                  </p>
                  <p>Airport: {flight.publicFlightState.flightStates[0]}</p>
                </div>
              </div>
              <Link
                className="details-button"
                to={`/flight-detail/${flight.id}`}
              >
                Check Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightsList;
