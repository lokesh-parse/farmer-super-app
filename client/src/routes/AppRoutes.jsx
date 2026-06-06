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
import NotificationsPage from "../pages/Notifications/NotificationsPage";
import ProfitCalculatorPage from "../pages/ProfitCalculator/ProfitCalculatorPage";
import GovernmentSchemesPage from "../pages/GovernmentSchemes/GovernmentSchemesPage";
import MarketplacePage from "../pages/Marketplace/MarketplacePage";
import AdminPage from "../pages/Admin/AdminPage";
import CropAdvisoryPage from "../pages/CropAdvisory/CropAdvisoryPage";
import LearningHubPage from "../pages/LearningHub/LearningHubPage";
import BeginnerFarmingPage from "../pages/LearningHub/Guides/BeginnerFarmingPage";
import CropKnowledgePage from "../pages/LearningHub/Guides/CropKnowledgePage";
import ModernFarmingPage from "../pages/LearningHub/Guides/ModernFarmingPage";
import TerraceFarmingPage from "../pages/LearningHub/Guides/TerraceFarmingPage";
import FishFarmingPage from "../pages/LearningHub/Guides/FishFarmingPage";
import PoultryFarmingPage from "../pages/LearningHub/Guides/PoultryFarmingPage";
import DairyFarmingPage from "../pages/LearningHub/Guides/DairyFarmingPage";
import OrganicFarmingPage from "../pages/LearningHub/Guides/OrganicFarmingPage";
import ProfitFarmingPage from "../pages/LearningHub/Guides/ProfitFarmingPage";
import YoutubeLearningPage from "../pages/LearningHub/Guides/YoutubeLearningPage";


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
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profit-calculator" element={<ProfitCalculatorPage />} />
        <Route path="government-schemes"element={<GovernmentSchemesPage />}/>
        <Route path="marketplace" element={<MarketplacePage />}/>
        <Route path="admin" element={<AdminPage />} />
        <Route path="crop-advisory" element={<CropAdvisoryPage />} />
        <Route path="learning-hub" element={<LearningHubPage />} />
        //learning hub inside 
        <Route path="learning-hub/beginner-farming" element={<BeginnerFarmingPage />}/>
       <Route path="learning-hub/crop-knowledge" element={<CropKnowledgePage />}/>
       <Route path="learning-hub/modern-farming" element={<ModernFarmingPage />}/>
       <Route path="learning-hub/terrace-farming" element={<TerraceFarmingPage />}/>
       <Route path="learning-hub/fish-farming" element={<FishFarmingPage />}/>
       <Route path="learning-hub/poultry-farming" element={<PoultryFarmingPage />}/>
       <Route path="learning-hub/dairy-farming" element={<DairyFarmingPage />} />
       <Route path="learning-hub/organic-farming" element={<OrganicFarmingPage />}/>
       <Route path="learning-hub/profit-farming" element={<ProfitFarmingPage />}/><Route path="learning-hub/youtube-learning" element={<YoutubeLearningPage />}/>




      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;