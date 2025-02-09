import "../styles/App.css";
import Dashboard from "../pages/Dashboard.tsx";
import DetailPage from "../pages/DetailPage.tsx";
import Layout from "../components/layout/layout.tsx";
import Kanban from "@/pages/Kanban.tsx";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function App() {
  const queryClient = new QueryClient();

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </QueryClientProvider>
    </Layout>
  );
}

export default App;
