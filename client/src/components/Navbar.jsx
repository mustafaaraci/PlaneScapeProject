import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { MdFlight } from "react-icons/md";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/UserSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.users);
  // console.log("aldığımız kullanıcı bilgileri", currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        dispatch(setUser(JSON.parse(storedUser))); // Kullanıcı bilgilerini yükle
      } catch (error) {
        console.error("Kullanıcı bilgileri yüklenirken hata oluştu:", error);
      }
    } else {
      dispatch(clearUser()); // Kullanıcı bilgisi yoksa temizle
    }
  }, [dispatch]);

  const handleClickRefreshPage = () => {
    navigate("/"); // Ana sayfaya yönlendir
    window.location.reload(); // Sayfayı yeniden yükle
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Kullanıcı bilgisini temizle
    dispatch(clearUser()); // Redux store'dan kullanıcıyı temizle
    navigate("/login"); // Giriş sayfasına yönlendir
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="navbar-brand" onClick={handleClickRefreshPage}>
          <div className="logo-container">
            <MdFlight className="logo-flight" />
          </div>
          PLANE SCAPE
        </div>
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
            {currentUser && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/myflight"
                >
                  <PiAirplaneTakeoffLight className="icon-myflight" />
                  MyFlight
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/deals"
              >
                <MdOutlineAirplaneTicket className="icon-deals" />
                Deals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/discover"
              >
                <BiWorld className="icon-discover" />
                Discover
              </NavLink>
            </li>
            <li className="nav-item">
              {currentUser ? (
                <>
                  <div className="user-photo">
                    <Link to="/profile">
                      {currentUser.image ? (
                        <img src={currentUser.image} alt="User" />
                      ) : (
                        <FaUserAlt className="icon-currentuser" />
                      )}
                    </Link>
                  </div>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to={"/profile"}
                  >
                    <span className="current-user-info">{`${currentUser.name} ${currentUser.surname}`}</span>
                  </NavLink>
                  <button className="nav-link" onClick={handleLogout}>
                    <TbLogout2 className="icon-logout" />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink className="nav-link" to="/login">
                  <FaUser className="icon-user" />
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
