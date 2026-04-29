import React, { useEffect, useState } from "react";
import API from "../Api/Api";

function Dashboard() {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState({ score: "", scoreDate: "" });

  const fetchScores = async () => {
    const res = await API.get("/scores");
    setScores(res.data);
  };

  const addScore = async () => {
    await API.post("/scores", newScore);
    fetchScores();
  };

  const deleteScore = async (id) => {
    await API.delete(`/scores/${id}`);
    fetchScores();
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
  fetchScores();
}, []);
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <input
  type="number"
  placeholder="Score (1-45)"
  min="1"
  max="45"
  onChange={e => setNewScore({...newScore, score: parseInt(e.target.value)})}/>
      <input type="date"
        onChange={e => setNewScore({...newScore, scoreDate: e.target.value})}/>
      <button onClick={addScore}>Add</button>

<button onClick={handleLogout} style={{background: "#ff4d4d"}}>
  Logout
</button>

      <ul>
        {scores.map(s => (
          <li key={s.id}>
            {s.score} - {s.scoreDate}
            <button onClick={() => deleteScore(s.id)}>Delete</button>
          </li>
          
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;