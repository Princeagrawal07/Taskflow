import React from 'react';
import { Check, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content" onClick={() => onToggleComplete(task._id)}>
        <div className="checkbox-custom">
          {task.completed && <Check size={14} strokeWidth={3} />}
        </div>
        <span className="task-text">{task.text}</span>
      </div>
      
      <button 
        className="btn-icon" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task._id);
        }}
        aria-label="Delete task"
        title="Delete Task"
      >
        <Trash2 size={15} />
      </button>
    </li>
  );
}
