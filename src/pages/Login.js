import React, { useState } from "react";
import API from "../Api/Api";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", data);

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("fullName", res.data.fullName);
      localStorage.setItem("email", res.data.email);

      // Redirect based on role
      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {error && (
        <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <input
        placeholder="Email"
        type="email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        Don't have an account?{" "}
        <a href="/register" style={{ color: "#667eea" }}>Register</a>
      </p>
    </div>
  );
}

export default Login;