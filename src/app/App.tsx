import "../styles/App.css";
import Dashboard from "../pages/Dashboard.tsx";
import Home from "../pages/Home.tsx";
import Kanban from "../pages/Kanban.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/kanban" element={<Kanban />} />
    </Routes>
  );
}

export default App;
