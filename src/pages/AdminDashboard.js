import React, { useEffect, useState } from "react";
import API from "../Api/Api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  // Auth check — admin only
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role || role !== "ADMIN") {
      window.location.href = "/";
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif" }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "30px"
      }}>
        <h2 style={{ color: "#333" }}>⛳ Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#ff4d4d", color: "white", border: "none",
            padding: "8px 16px", borderRadius: "8px", cursor: "pointer"
          }}>
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["users"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 20px",
              background: activeTab === tab ? "#667eea" : "#eee",
              color: activeTab === tab ? "white" : "#333",
              border: "none", borderRadius: "8px", cursor: "pointer",
              textTransform: "capitalize"
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Users Table */}
      {activeTab === "users" && (
        <div>
          <h3 style={{ marginBottom: "15px" }}>All Users</h3>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            background: "white", borderRadius: "10px",
            overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <thead style={{ background: "#667eea", color: "white" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Full Name</th>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id}
                  style={{ background: i % 2 === 0 ? "#f9f9f9" : "white" }}>
                  <td style={td}>{u.id}</td>
                  <td style={td}>{u.fullName}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>
                    <span style={{
                      background: u.role === "ADMIN" ? "#764ba2" : "#667eea",
                      color: "white", padding: "3px 10px",
                      borderRadius: "20px", fontSize: "12px"
                    }}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: "600"
};

const td = {
  padding: "12px 16px",
  borderBottom: "1px solid #eee"
};

export default AdminDashboard;