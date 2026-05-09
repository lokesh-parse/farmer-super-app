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

function DashboardPage() {
  const navigate = useNavigate();

  const user = getUser();
  const history = getHistory();
  const selectedLanguage = getLanguage(); 

  const [notifications, setNotifications] = useState([]);

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

  const handleRemove = (id) => {
    removeNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const farmRecords = JSON.parse(localStorage.getItem("farmRecords")) || [];
  const communityPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];

  const totalActivities = history.length;
  const chatCount = history.filter((item) => item.type === "AI Chat").length;
  const weatherCount = history.filter((item) => item.type === "Weather").length;
  const cropCount = history.filter((item) => item.type === "Crop Doctor").length;

  const lastActivity = history[0];
  const recentHistory = history.slice(0, 4);

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <PageHeader
          title={`Welcome, ${user?.name || "Farmer"} 👋`}
          subtitle="Here is your farming platform overview"
        />
        
        {/* <-- New Language Display added here --> */}
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

      {/* <-- New Notifications UI added here --> */}
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
        <StatCard title="Farm Records" value={farmRecords.length} />
        <StatCard title="Community Posts" value={communityPosts.length} />
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