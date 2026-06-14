const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Fallback State (for demonstration/evaluation without active DB)
let dbConnected = false;
let memoryTasks = [];

// Connect MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-db";
mongoose.connect(MONGODB_URI)
  .then(() => {
    dbConnected = true;
    console.log(`MongoDB Connected successfully: ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    console.log("\x1b[33m%s\x1b[0m", "⚠️  Falling back to In-Memory storage mode. Tasks will not persist across server restarts.");
    console.log("To persist tasks, paste your MongoDB Atlas Connection URI inside backend/.env and restart.");
  });

// Schema definition
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);

// GET /tasks - Retrieve all tasks (newest first)
app.get("/tasks", async (req, res) => {
  try {
    if (!dbConnected) {
      const sorted = [...memoryTasks].sort((a, b) => b.createdAt - a.createdAt);
      return res.status(200).json(sorted);
    }
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /add - Add a new task
app.post("/add", async (req, res) => {
  try {
    if (!req.body.text || !req.body.text.trim()) {
      return res.status(400).json({ error: "Task cannot be empty!" });
    }
    const text = req.body.text.trim();

    if (!dbConnected) {
      const newTask = {
        _id: new mongoose.Types.ObjectId().toString(),
        text,
        completed: false,
        createdAt: new Date()
      };
      memoryTasks.push(newTask);
      return res.status(201).json(newTask);
    }

    const newTask = new Task({ text, completed: false });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PATCH /tasks/:id - Toggle task completion status
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!dbConnected) {
      const task = memoryTasks.find(t => t._id === id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      task.completed = !task.completed;
      return res.status(200).json(task);
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!dbConnected) {
      const index = memoryTasks.findIndex(t => t._id === id);
      if (index === -1) return res.status(404).json({ error: "Task not found" });
      memoryTasks.splice(index, 1);
      return res.status(200).json({ message: "Task deleted successfully", id });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
