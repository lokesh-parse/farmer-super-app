import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { getAdminStats } from "../../services/adminService";

function AdminPage() {
  const [stats, setStats] = useState({
    farmers: 0,
    farmRecords: 0,
    communityPosts: 0,
    marketplaceItems: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getAdminStats();
      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Platform overview and activity summary."
      />

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Total Farmers</h3>
          <p>{stats.farmers}</p>
        </div>

        <div className="admin-stat-card">
          <h3>Farm Records</h3>
          <p>{stats.farmRecords}</p>
        </div>

        <div className="admin-stat-card">
          <h3>Community Posts</h3>
          <p>{stats.communityPosts}</p>
        </div>

        <div className="admin-stat-card">
          <h3>Marketplace Items</h3>
          <p>{stats.marketplaceItems}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;