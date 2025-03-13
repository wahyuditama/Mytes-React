import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CRUD from "./pages/crud";
import API from "./pages/api";

function App(){
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/crud" element={<CRUD/>}/>
        <Route path="/api" element={<API/>}/>
      </Routes>
    </Router>
  );
}

export default App;
