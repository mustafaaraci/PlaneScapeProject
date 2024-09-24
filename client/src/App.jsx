import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./css/HeroSection.css"
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import MyFlight from './pages/MyFlight';



function App() {
 
  return (
    <>
    <div className="container">
    <Navbar/>
      <Routes>
       <Route path="/" element = {<Home/>}/>
       <Route path="myflight" element ={<MyFlight/>}/>
      </Routes>
    
   </div>
    
    </>
  )
}

export default App
