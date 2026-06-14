import React from 'react';
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';

export default function StatsCard({ tasks = [] }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <ClipboardList size={12} /> Total
        </div>
        <div className="stat-value">{totalTasks}</div>
      </div>
      
      <div className="stat-card" style={{ borderColor: completedTasks > 0 ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)' }}>
        <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <CheckCircle2 size={12} color="var(--success)" /> Done
        </div>
        <div className="stat-value" style={{ color: completedTasks > 0 ? 'var(--success)' : 'inherit' }}>
          {completedTasks}
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <Clock size={12} color="var(--primary)" /> Pending
        </div>
        <div className="stat-value">{pendingTasks}</div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
    </div>
  );
}
