import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/HeroSection.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyFlight from "./pages/MyFlight";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myflight" element={<MyFlight />} />
          <Route path="/flight-detail/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
