import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";
import { getHistory } from "../../utils/history";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import SectionCard from "../../components/common/SectionCard";
import { getLanguage } from "../../utils/language"; 
import {
  getNotifications,
  addNotification,
  removeNotification,
} from "../../utils/notifications";

// Step 1: Services import
import { getFarmRecords } from "../../services/farmService";
import { getCommunityPosts } from "../../services/communityService";
import { getProfile } from "../../services/profileService";
import { getRecommendations } from "../../services/recommendationService";
import { getDashboardStats } from "../../services/dashboardService"; // Added

function DashboardPage() {
  const navigate = useNavigate();

  const user = getUser();
  const history = getHistory();
  const selectedLanguage = getLanguage(); 

  const [notifications, setNotifications] = useState([]);
  
  // Step 2: States add
  const [farmRecords, setFarmRecords] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  
  // Added Dashboard Stats State
  const [dashboardStats, setDashboardStats] = useState({
    farmers: 0,
    farmRecords: 0,
    communityPosts: 0,
    marketplaceItems: 0,
    recommendations: 0,
  });

  useEffect(() => {
    const saved = getNotifications();
    setNotifications(saved);

    // auto generate dummy alerts (only once)
    if (saved.length === 0) {
      const demoAlerts = [
        {
          id: Date.now() + 1,
          type: "weather",
          text: "Rain expected tomorrow. Avoid irrigation.",
        },
        {
          id: Date.now() + 2,
          type: "market",
          text: "Tomato price increased in Pune market.",
        },
        {
          id: Date.now() + 3,
          type: "crop",
          text: "Check your crop for pest infection this week.",
        },
      ];

      demoAlerts.forEach(addNotification);
      setNotifications(demoAlerts);
    }
  }, []);

  // Step 3: Data load
  useEffect(() => {
    async function loadDashboardData() {
      const farmData = await getFarmRecords();
      const communityData = await getCommunityPosts();
      const profileData = await getProfile();
      const recommendationData = await getRecommendations();
      const statsData = await getDashboardStats(); // Added

      setFarmRecords(farmData);
      setCommunityPosts(communityData);
      setProfile(profileData);
      setRecommendations(recommendationData);
      setDashboardStats(statsData); // Added
    }

    loadDashboardData();
  }, []);

  const handleRemove = (id) => {
    removeNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const totalActivities = history.length;
  const chatCount = history.filter((item) => item.type === "AI Chat").length;
  const weatherCount = history.filter((item) => item.type === "Weather").length;
  const cropCount = history.filter((item) => item.type === "Crop Doctor").length;

  const lastActivity = history[0];
  const recentHistory = history.slice(0, 4);

  // Step 4: Stats calculation
  const totalExpense = farmRecords.reduce((sum, record) => {
    const expense = Number(record.expense);
    return sum + (isNaN(expense) ? 0 : expense);
  }, 0);

  const topCrop =
    farmRecords.length > 0
      ? farmRecords[0].crop_name || "N/A"
      : "N/A";

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <PageHeader
          title={`Welcome, ${user?.name || "Farmer"} 👋`}
          subtitle="Here is your farming platform overview"
        />
        
        <p className="dashboard-language">
          Preferred Language: {selectedLanguage}
        </p>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/app/chat")}>Open AI Chat</button>
          <button onClick={() => navigate("/app/farm-records")}>
            Add Farm Record
          </button>
          <button onClick={() => navigate("/app/community")}>
            Open Community
          </button>
        </div>
      </div>

      <div className="dashboard-alerts">
        <h3>Notifications</h3>

        {notifications.length > 0 ? (
          <div className="alert-list">
            {notifications.map((n) => (
              <div key={n.id} className={`alert-card ${n.type}`}>
                <p>{n.text}</p>
                <button onClick={() => handleRemove(n.id)}>Dismiss</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No alerts</p>
        )}
      </div>

      <div className="dashboard-grid">
        <StatCard title="Total Activities" value={totalActivities} />
        <StatCard title="AI Chats" value={chatCount} />
        <StatCard title="Weather Checks" value={weatherCount} />
        <StatCard title="Crop Scans" value={cropCount} />
        
        {/* Step 5: Cards add (Updated with dashboardStats) */}
        <StatCard title="Farmers" value={dashboardStats.farmers} />
        <StatCard title="Farm Records" value={dashboardStats.farmRecords} />
        <StatCard title="Community Posts" value={dashboardStats.communityPosts} />
        <StatCard title="Marketplace Items" value={dashboardStats.marketplaceItems} />
        <StatCard title="Recommendations" value={dashboardStats.recommendations} />
        
        {/* Preserved old metrics that didn't overlap */}
        <StatCard title="Total Expense" value={`₹${totalExpense}`} />
        <StatCard title="Top Crop" value={topCrop} />
        <StatCard title="Village" value={profile.village || "Not set"} />
      </div>
      
      <div className="recommendation-card">
        <h2>Smart Recommendations</h2>

        {recommendations.map((item) => (
          <div key={item.id} className="recommendation-item">
            <h3>{item.title}</h3>
            <p>{item.recommendation}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-bottom-grid">
        <SectionCard title="Last Activity">
          {lastActivity ? (
            <p>
              <strong>{lastActivity.type}:</strong> {lastActivity.detail}
            </p>
          ) : (
            <p>No activity yet.</p>
          )}
        </SectionCard>

        <SectionCard title="Recent Activity">
          {recentHistory.length > 0 ? (
            <div className="dashboard-history-list">
              {recentHistory.map((item) => (
                <div key={item.id} className="dashboard-history-item">
                  <span className="dashboard-history-type">{item.type}</span>
                  <p>{item.detail}</p>
                  <small>{item.time}</small>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent activity available.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

export default DashboardPage;