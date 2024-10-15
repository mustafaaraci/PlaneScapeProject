import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/UserSlice";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.users);

  // Hata mesajını temizle
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Giriş işlemi için Redux thunk'ını çağır
      const responseUser = await dispatch(
        loginUser({ email, password })
      ).unwrap();

      // Başarılı giriş sonrası kullanıcı bilgilerini localStorage'a kaydet
      if (responseUser) {
        localStorage.setItem("user", JSON.stringify(responseUser));
      }

      // Başarılı giriş sonrası yönlendirme
      Swal.fire({
        icon: "success",
        title: "Başarılı:)",
        text: responseUser.message, //loginUser dan gelen mesajı gösteriyoruz.
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Giriş Hatası!",
        text: error,
      });
    }
  };
  return (
    <div className="hero-section">
      <div className="login-container">
        <h2 className="head-login">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-container">
            <div className="form-group">
              <label className="label-login">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-login"
                required
              />
            </div>
            <div className="form-group">
              <label className="label-login">Password:</label>
              <div className="input-with-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-login"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="eye-icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="eye-icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't you have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="signup-link-text"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
