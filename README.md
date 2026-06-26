# TaskFlow ⚡

TaskFlow is a premium, fully functional **MERN (MongoDB, Express, React, Node.js)** To-Do List application. It features complete CRUD operations, a responsive and accessible user interface, real-time task statistics, and an automatic database fallback.

---

## ✨ Features

- **Full CRUD Operations**:
  - **Create**: Add new tasks instantly.
  - **Read**: Fetch and display tasks in chronological order.
  - **Update**: Toggle task completion status or double-click to edit task text inline.
  - **Delete**: Remove tasks with smooth slide-out CSS animations.
- **Dynamic Stats Widget**: Real-time counter displaying Total Tasks, Completed Tasks, and overall Progress Percentage.
- **Midnight Glassmorphism UI**: High-end styling utilizing CSS glassmorphism card layouts, linear gradients, neon glows, custom SVGs, and responsive design (optimized for mobile and desktop).
- **Zero-Config Database Fallback**: Connects directly to MongoDB Atlas. If no connection string is provided, it automatically spins up a local in-memory database (`mongodb-memory-server`) in RAM.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Vanilla CSS, HTML5
- **Backend**: Express.js, Node.js
- **Database**: MongoDB (Mongoose ODM)
- **Concurrency**: Concurrently (runs frontend & backend in a single terminal)

---

## 🚀 How to Run Locally

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 2. Clone and Setup
Open your terminal and navigate to the project directory:

```bash
# Install all dependencies (root, backend, and frontend)
npm run install-all
```

### 3. Database Configuration (Optional)
By default, the app runs in **in-memory database fallback mode** (all data is saved in RAM and resets when the server stops). 

If you want persistent storage, open `backend/.env` and paste your MongoDB Atlas URI:
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster...
```

### 4. Start the Application
Run the concurrent dev command:
```bash
npm run dev
```

- The **React App** will launch at `http://localhost:5173`
- The **Express Server** will run on `http://localhost:5000`
