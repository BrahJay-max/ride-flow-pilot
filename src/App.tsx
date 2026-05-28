import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/hooks/use-driver-state';
import { Layout } from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Earnings from '@/pages/Earnings';
import History from '@/pages/History';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Passenger from '@/pages/Passenger';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/passenger" element={<Passenger />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;