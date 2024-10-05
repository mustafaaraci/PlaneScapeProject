import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyFlights, deleteFlight } from "../redux/MyFlightSlice";
import "../css/MyFlight.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaPlaneSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyFlight = () => {
  const dispatch = useDispatch();
  const { myFlights, loading, error } = useSelector((state) => state.myflights);

  // Uçuş verilerini çağırmak için useEffect kullanıyoruz
  useEffect(() => {
    dispatch(getMyFlights());
  }, []);

  //silme fonksiyonumuz
  const handleDeleteClick = (flightId) => {
    dispatch(deleteFlight(flightId));
    toast.success("Uçuş başarıyla silindi!", {
      autoClose: 1000,
      pauseOnHover: false,
    });
  };

  return (
    <>
      <ToastContainer
        style={{ marginTop: "81px", marginRight: "-15px", width: "240px" }}
        position="top-right"
      />
      <div className="hero-section">
        <div className="hero-content-1">
          <div className="flight-container-1">
            {loading ? (
              <Spinner animation="border" style={{ color: "purple" }} />
            ) : myFlights.length === 0 ? (
              <p>
                Uçuşlarınız Yok <FaPlaneSlash className="icon-planeslash" />
              </p>
            ) : (
              myFlights.map((flight) => (
                <div className="flight-card" key={flight._id}>
                  <div className="flight-header">
                    <h4>{flight.destination}</h4>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(flight._id)}
                    >
                      Sil
                    </Button>
                  </div>
                  <div className="flight-details">
                    <div className="flight-detail">
                      <span>Kalkış Saati:</span>
                      <p>{new Date(flight.departureTime).toLocaleString()}</p>
                    </div>
                    <div className="flight-detail">
                      <span>Süre:</span>
                      <p>2h 30m</p>
                    </div>
                    <div className="flight-detail">
                      <span>Fiyat:</span>
                      <p>{flight.price}$</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFlight;
