import React, { useState } from "react";
import API from "../Api/Api";
import "../App.css";

function Register() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  <p style={{marginTop: "10px", fontSize: "14px"}}>
  Already have an account?{" "}
  <a href="/" style={{color: "#667eea"}}>Login</a>
</p>

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", data);

      // OPTIONAL: store token directly
      localStorage.setItem("token", res.data.token);

      alert("Registration successful!");

      // Redirect to dashboard OR login
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setData({ ...data, fullName: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password (min 8 chars)"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;