import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import AuthPage from "../pages/Auth/AuthPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ChatPage from "../pages/Chat/ChatPage";
import WeatherPage from "../pages/Weather/WeatherPage";
import CropDoctorPage from "../pages/CropDoctor/CropDoctorPage";
import FarmRecordsPage from "../pages/FarmRecords/FarmRecordsPage"; 
import MarketPage from "../pages/Market/MarketPage";
import CommunityPage from "../pages/Community/CommunityPage"; // <-- New Import added here
import ProfilePage from "../pages/Profile/ProfilePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="weather" element={<WeatherPage />} />
        <Route path="crop-doctor" element={<CropDoctorPage />} />
        <Route path="farm-records" element={<FarmRecordsPage />} />
        <Route path="market" element={<MarketPage />} /> 
        <Route path="community" element={<CommunityPage />} /> {/* <-- New Route added here */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;