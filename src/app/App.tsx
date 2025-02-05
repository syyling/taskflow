import "../styles/App.css";
import Dashboard from "../pages/Dashboard.tsx";
import Home from "../pages/Home.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
