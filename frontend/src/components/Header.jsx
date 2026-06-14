import React from 'react';
import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <header style={{ marginBottom: '1.5rem' }}>
      <div className="logo-container">
        <div className="logo-graphic">
          <CheckSquare size={18} color="#fff" />
        </div>
        <span className="logo-text">TASK<span>FLOW</span></span>
      </div>
      <h1>TaskFlow To-Do</h1>
    </header>
  );
}
