import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ContextProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Navbar/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        </div>
        <Footer/>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
