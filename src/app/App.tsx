import "../styles/App.css";
import Dashboard from "../pages/Dashboard.tsx";
import DetailPage from "../pages/DetailPage.tsx";
import Kanban from "../pages/Kanban.tsx";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
