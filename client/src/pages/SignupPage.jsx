import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignupPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/UserSlice";
import Swal from "sweetalert2";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };
  //email validasyonu
  const validateEmail = (email) => {
    const validDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    const emailParts = email.split("@");

    if (emailParts.length !== 2) return false;
    const domain = emailParts[1];

    return validDomains.includes(domain); // Geçerli alan adları kontrolü
  };

  //kullanıcı veri tabanına kaydolurken ismi ve soy ismin ilk harfi büyük olsun
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  //tıklayınca gerçekleşecek olay
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !password || !confirmPassword) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }
    //email.validaysonu
    if (!validateEmail(email)) {
      setErrorMessage(
        "Lütfen geçerli bir email adresi girin (örn: @gmail.com, @hotmail.com, @outlook.com)vb."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Şifreler eşleşmiyor.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
      );
      return;
    }

    //veri tabanına kayıt sırasında isim baş harfi büyük olsun fonksiyonunu atadık
    const formattedName = capitalizeFirstLetter(name);
    const formattedSurname = capitalizeFirstLetter(surname);

    dispatch(
      registerUser({
        name: formattedName,
        surname: formattedSurname,
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Kayıt Başarılı :)",
          text: "Hesabınız başarıyla oluşturuldu.",
          confirmButtonText: "Tamam",
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Kayıt Hatası!",
          text: error.message || "Bir hata oluştu.",
          confirmButtonText: "Tamam",
        });
      });
  };

  return (
    <div className="hero-section">
      <div className="signup-container">
        <h2 className="head-signup">Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-container">
            <div className="form-group">
              <label className="label-signup">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-signup"
                required
              />
            </div>

            <div className="form-group">
              <label className="label-signup">Surname:</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="input-signup"
                required
              />
            </div>

            <div className="form-group">
              <label className="label-signup">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-signup"
                required
              />
            </div>

            <div className="form-group">
              <label className="label-signup">Password:</label>
              <div className="input-with-icon-signup">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-signup"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="eye-icon-signup"
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

            <div className="form-group">
              <label className="label-signup">Confirm Password:</label>
              <div className="input-with-icon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-signup"
                  required
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Kayıt Olunuyor..." : "Sign Up"}
          </button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="login-link-text">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
