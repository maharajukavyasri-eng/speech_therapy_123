import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Mic, LayoutDashboard, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Login from './pages/Login';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <nav style={{ padding: '16px 32px', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px' }}>
            <Mic size={20} color="white" />
          </div>
          Speech Assistant
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mic size={18} /> Practice
          </NavLink>
          <button onClick={() => setIsAuthenticated(false)} style={{ background: 'none', border: 'none', color: 'var(--accent-error)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontWeight: '500' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
