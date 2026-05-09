import React from "react";
import { getUser } from "../../utils/auth";
import { getHistory, clearHistory } from "../../utils/history";
import PageHeader from "../../components/common/PageHeader"; 
import { getLanguage } from "../../utils/language"; // <-- New Import added here

function ProfilePage() {
  const currentUser = getUser();
  const preferredLanguage = getLanguage(); // <-- Added here

  const user = {
    name: currentUser?.name || "Farmer User",
    email: currentUser?.email || "user@example.com",
    role: currentUser?.role || "farmer",
    joined: "April 2026",
    language: preferredLanguage, // <-- Added language property
  };

  // Using dynamic history from utils
  const history = getHistory();

  // Generating recent activities from history
  const recentActivities =
    history.length > 0
      ? history.slice(0, 4).map((item) => `${item.type}: ${item.detail}`)
      : ["No recent activity yet"];

  return (
    <div className="profile-page">
      <PageHeader
        title="Profile & History"
        subtitle="Manage your account and review your recent farming activity."
      />

      <div className="profile-top-grid">
        <div className="profile-card">
          <h2>User Information</h2>
          <div className="profile-info-list">
            <div>
              <span>Name</span>
              <strong>{user.name}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</strong>
            </div>
            <div>
              <span>Joined</span>
              <strong>{user.joined}</strong>
            </div>
            {/* <-- New Language Block added here --> */}
            <div>
              <span>Language</span>
              <strong>{user.language}</strong>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>Quick Stats</h2>
          <div className="profile-stats-grid">
            <div className="profile-stat-box">
              <span>AI Chats</span>
              <strong>12</strong>
            </div>
            <div className="profile-stat-box">
              <span>Weather Checks</span>
              <strong>8</strong>
            </div>
            <div className="profile-stat-box">
              <span>Crop Scans</span>
              <strong>4</strong>
            </div>
            <div className="profile-stat-box">
              <span>Saved Records</span>
              <strong>3</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-bottom-grid">
        <div className="profile-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map((item, index) => (
              <div key={index} className="activity-item">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-header">
            <h2>History Timeline</h2>
            <button
              className="clear-history-btn"
              onClick={() => {
                clearHistory();
                window.location.reload();
              }}
            >
              Clear
            </button>
          </div>
          
          <div className="history-list">
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-type">{item.type}</div>
                  <div className="history-detail">{item.detail}</div>
                  <div className="history-time">{item.time}</div>
                </div>
              ))
            ) : (
              <div className="history-item">
                <div className="history-detail">No history available yet.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;