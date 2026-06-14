import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        className="input-field"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={100}
      />
      <button type="submit" className="btn btn-primary">
        <Plus size={18} />
        Add Task
      </button>
    </form>
  );
}
