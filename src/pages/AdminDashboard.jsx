import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../services/adminService";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminService.isAdminLoggedIn()) {
      navigate("/admin-login");
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboardStats();
      if (response?.success) {
        setStats(response.stats);
        setRecentOrders(response.recentOrders || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h2>Admin Dashboard</h2>

      <div className="grid">

        <div className="kpi" style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Users</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats?.totalUsers || 0}</p>
        </div>

        <div className="kpi" style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Products</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats?.totalProducts || 0}</p>
        </div>

        <div className="kpi" style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Orders</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats?.totalOrders || 0}</p>
        </div>

        <div className="kpi" style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>Revenue</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>${stats?.totalRevenue || 0}</p>
        </div>

      </div>

      <h3 style={{ marginTop: "30px" }}>Recent Orders</h3>

      {recentOrders.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#333", color: "white" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Order ID</th>
              <th style={{ padding: "10px", textAlign: "left" }}>User</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{order._id?.substr(-8)}</td>
                <td style={{ padding: "10px" }}>{order.userId?.username || "N/A"}</td>
                <td style={{ padding: "10px" }}>${order.finalPrice}</td>
                <td style={{ padding: "10px" }}>{order.status}</td>
                <td style={{ padding: "10px" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recent orders</p>
      )}

    </div>
  );
}

export default AdminDashboard;