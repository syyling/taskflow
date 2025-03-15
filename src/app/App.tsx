import '../styles/App.css';
import Dashboard from '../pages/Dashboard.tsx';
import DetailPage from '../pages/DetailPage.tsx';
import Layout from '../components/layout/layout.tsx';
import Kanban from '@/pages/Kanban.tsx';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import DashboardSkeleton from '@/pages/DashboardSkeleton.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/detail/:projectId" element={<DetailPage />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </QueryClientProvider>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
