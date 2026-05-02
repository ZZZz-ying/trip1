import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecommendationPage from './pages/RecommendationPage';
import RoutePlanningPage from './pages/RoutePlanningPage';
import FacilityQueryPage from './pages/FacilityQueryPage';
import DiaryPage from './pages/DiaryPage';
import FoodPage from './pages/FoodPage';
import AuthPage from './pages/AuthPage';
import PersonalCenterPage from './pages/PersonalCenterPage';
import TravelPartnerPage from './pages/TravelPartnerPage';
import DatabaseSetupPage from './pages/DatabaseSetupPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Page - No Layout */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/setup" element={<DatabaseSetupPage />} />

          {/* Main App - With Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="recommendation" element={<RecommendationPage />} />
            <Route path="route-planning" element={<RoutePlanningPage />} />
            <Route path="facility-query" element={<FacilityQueryPage />} />
            <Route path="diary" element={<DiaryPage />} />
            <Route path="food" element={<FoodPage />} />
            <Route path="partner" element={<TravelPartnerPage />} />
            <Route path="personal-center" element={<PersonalCenterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
