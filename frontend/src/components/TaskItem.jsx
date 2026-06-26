import React, { useState, useEffect, useRef } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isRemoving, setIsRemoving] = useState(false);
  const editInputRef = useRef(null);

  // Focus the input when starting edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    onUpdateTask(task._id, { completed: !task.completed });
  };

  const handleEditSave = () => {
    if (editText.trim() === '') return;
    if (editText.trim() !== task.text) {
      onUpdateTask(task._id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = () => {
    setIsRemoving(true);
    // Wait for the slide-out animation to complete (300ms in CSS)
    setTimeout(() => {
      onDeleteTask(task._id);
    }, 300);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isRemoving ? 'removing' : ''}`}>
      {/* Checkbox wrapper */}
      {!isEditing && (
        <label className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={task.completed}
            onChange={handleToggle}
          />
          <span className="checkmark"></span>
        </label>
      )}

      {/* Task text content */}
      <div className="task-content">
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEditSave}
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>

      {/* Actions */}
      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="btn-icon save" onClick={handleEditSave} title="Save changes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <button
              className="btn-icon cancel"
              onClick={() => {
                setEditText(task.text);
                setIsEditing(false);
              }}
              title="Cancel editing"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button className="btn-icon edit" onClick={() => setIsEditing(true)} title="Edit task">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button className="btn-icon delete" onClick={handleDeleteClick} title="Delete task">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
