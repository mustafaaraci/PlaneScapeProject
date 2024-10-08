import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import "../css/DetailPage.css";
import { getAllFlights } from "../redux/FlightProductSlice";

const DetailPage = () => {
  const { id } = useParams();
  const { Flights } = useSelector((state) => state.flights);
  const dispatch = useDispatch();
  //store dan aldığımız uçuşlarımızdan, paramsdan gelen id ye eşit olanı çağırıyoruz
  const flight = Flights.find((f) => f.id === id);
  //console.log(flight);
  useEffect(() => {
    dispatch(getAllFlights(id));
  }, [dispatch, id]);

  if (!flight) {
    return <div>Uçuş bulunamadı.</div>;
  }

  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="flight-card">
          <div className="flight-detail">
            <div className="flight-details-additional">
              <h3>Additional Information</h3>
              <ul>
                <li>
                  Flight Code:{" "}
                  <span className="info-dynamic">{flight.flightName}</span>
                </li>
                <li>
                  Aircraft Type:{" "}
                  <span className="info-dynamic">
                    {flight.aircraftType.iataMain} -{" "}
                    {flight.aircraftType.iataSub}
                  </span>
                </li>
                <li>
                  Airline Company:{" "}
                  <span className="info-dynamic">{flight.airlineCode}</span>
                </li>
                <li>
                  Terminal:{" "}
                  <span className="info-dynamic">{flight.terminal}</span>
                </li>
                <li>
                  Flight Type:{" "}
                  <span className="info-dynamic">{flight.serviceType}</span>
                </li>
                <li>
                  Visas:{" "}
                  <span className="info-dynamic">
                    {" "}
                    {flight.route.visa ? "Available" : "Not Available"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="flight-info">
              <div className="left-info">
                <h4>{flight.route.destinations[0]}</h4>
                <div className="departure-info">
                  <FaPlaneDeparture className="icon-departure" />
                  <p>Departure</p>
                </div>
                <p>
                  <strong>
                    {new Date(flight.scheduleDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
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
                    {new Date(flight.actualLandingTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </strong>
                </p>
                <p>Airport: {flight.publicFlightState.flightStates[0]}</p>
              </div>
            </div>
          </div>
          <button className="button-buy">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
