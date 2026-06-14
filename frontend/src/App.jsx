import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, ListTodo } from "lucide-react";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

// Connect API base path
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Backend fetch error:", err);
      setError("Unable to connect to backend server. Ensure Express is running on Port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (text) => {
    try {
      const res = await api.post("/add", { text });
      setTasks((prev) => [res.data, ...prev]);
      setError(null);
    } catch (err) {
      console.error("Add task error:", err);
      setError(err.response?.data?.error || "Failed to add task.");
    }
  };

  // Toggle completion status
  const toggleComplete = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}`);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
      setError(null);
    } catch (err) {
      console.error("Update task error:", err);
      setError("Failed to update task completion.");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError(null);
    } catch (err) {
      console.error("Delete task error:", err);
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      {error && (
        <div className="alert-banner">
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}

      <StatsCard tasks={tasks} />

      <TaskForm onAddTask={addTask} />

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-secondary)" }}>
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <ListTodo size={40} />
          </div>
          <p>Your task list is empty. Add a task to get started!</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
