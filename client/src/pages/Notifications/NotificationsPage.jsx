import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { getNotifications } from "../../services/notificationService";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const data = await getNotifications();
      setNotifications(data);
    }

    loadNotifications();
  }, []);

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Important alerts for your farm."
      />

      <div className="notification-list">
        {notifications.map((item) => (
          <div key={item.id} className="notification-card">
            <span>{item.type.toUpperCase()}</span>
            <h3>{item.message}</h3>
            <p>{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;